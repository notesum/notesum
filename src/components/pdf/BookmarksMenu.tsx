import React, { useRef, useState, RefObject } from 'react';
import { Menu, IconButton, Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type BookmarkMenuProps = {
    outline: any,
    onNavigate: (loc: [{ num: number, gen: number }] | string) => Promise<void>,
    anchor?: Element,
    isOpen?: boolean
};

export default function BookmarksMenu({ outline, onNavigate }: BookmarkMenuProps) {

    const [isOpen, setIsOpen] = useState(false);
    const anchor = useRef(null);

    return (
        <>
            <IconButton ref={anchor} aria-haspopup="true" onClick={() => setIsOpen(true)}>
                <BookmarkBorderIcon />
            </IconButton>
            <Menu
                anchorEl={anchor.current}
                keepMounted
                open={isOpen}
                onClose={() => setIsOpen(false)}>
                <BookmarkMenuList onNavigate={onNavigate} level={0} outline={outline} />
            </Menu>
        </>
    );
}


type BookmarkMenuListProps = {
    outline: any,
    onNavigate: (loc: [{ num: number, gen: number }] | string) => Promise<void>,
    level: number
};

const BookmarkMenuList = React.forwardRef(({ outline, onNavigate, level }: BookmarkMenuListProps, ref: RefObject<HTMLUListElement>) => {
    return (
        <List ref={ref}>
            {outline.map((bookmark, id) => {
                return (<BookmarkMenuItem onNavigate={onNavigate} level={level} key={id} bookmark={bookmark} />);
            })}
        </List>
    );
});


type BookmarkMenuItemProps = {
    bookmark: any,
    onNavigate: (loc: [{ num: number, gen: number }] | string) => Promise<void>,
    level: number
};


function BookmarkMenuItem({ bookmark, onNavigate, level }: BookmarkMenuItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen((curIsOpen) => !curIsOpen);
    };

    return (
        <>
            {bookmark.items.length > 0 &&
                <>
                <ListItem dense button onClick={toggleOpen}>
                    <ListItemText style={{
                        paddingLeft: `${20 * level}px`,
                    }} primary={bookmark.title} />
                    {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <BookmarkMenuList onNavigate={onNavigate} outline={bookmark.items} level={level+1} />
                </Collapse>
                </>}

            {bookmark.items.length === 0 &&
                <ListItem dense button onClick={() => onNavigate(bookmark.dest)}>
                    <ListItemText style={{
                        paddingLeft: `${20 * level}px`,
                    }} primary={bookmark.title} />
                </ListItem>
            }
        </>
    );
}