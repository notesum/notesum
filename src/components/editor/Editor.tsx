import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Editor, EditorState, ContentState, Modifier, RichUtils, ContentBlock, genKey, AtomicBlockUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, ButtonGroup, Paper, Grid, Box } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
import CodeIcon from '@material-ui/icons/Code';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import Immutable from 'immutable';
import { convertToRaw } from 'draft-js';

import './Editor.css';

export default function TextEditor() {

    const [editorState, setEditor] = useState(EditorState.createWithContent(ContentState.createFromText('')));
    const [style, setStyle] = useState('unstyled');
    let prevSelection = null;

    // The callback function for the highlight event handler
    // TODO find a way to abstract this to another file so Highligh can have more functions
    const handleEditor = useCallback(event => {
        if (window.getSelection().toString().length && window.getSelection().toString() !== prevSelection &&
            (getSelectionParentElement().className === 'page' || getSelectionParentElement().className === 'textLayer')) {
            const exactText = window.getSelection().toString();
            prevSelection = exactText;
            // TODO parse from PDF
            // const textStyle = 'header-one';
            setEditor(prevEditor => insertNewBlock(prevEditor, exactText, style));

        }
    }, [style]);


    useEffect(() => {
        focusEditor();
        // Listen to mouseup for highlight behaviour
        window.addEventListener('mouseup', handleEditor);

        return () => {
            window.removeEventListener('mouseup', handleEditor);
        };
    }, [handleEditor, style]);


    // Get the parent element of the selection by also grouping all the parent elements
    // TODO not use copy pasta from the internet
    // Source: https://stackoverflow.com/questions/7215479/get-parent-element-of-a-selected-text
    function getSelectionParentElement() {
        let parentEl = null;
        let sel = null;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                parentEl = sel.getRangeAt(0).commonAncestorContainer;
                if (parentEl.nodeType !== 1) {
                    parentEl = parentEl.parentNode;
                }
            }
        } else if ((sel === document.getSelection()) && sel.type !== 'Control') {
            parentEl = sel.createRange().parentElement();
        }
        return parentEl.parentNode;
    }

    const editor = useRef(null);

    function focusEditor() {
        editor.current.focus();
    }


    const styleMap = {
        'H1': {
            fontSize: '1.8em'
        },
        'H2': {
            fontSize: '1.4em'
        },
        'H3': {
            fontSize: '1.2em'
        },
    };


    const blockRenderMap = Immutable.Map({
        'header-two': {
            element: 'h2'
        },
        'unstyled': {
            element: 'div'
        },
        'testing': {
            element: 'unordered-list-item'
        }
    });

    function formatText(f) {
        // const nextState = RichUtils.toggleBlockType(editorState, f);
        const nextState = RichUtils.toggleInlineStyle(editorState, f);
        setEditor(nextState);

    }

    function code() {
        const nextState = RichUtils.toggleCode(editorState);
        setEditor(nextState);
    }

    function saveState() {
        const save = convertToRaw(editorState.getCurrentContent());
        console.log(save);
    }

    // Returns new editor state with a block pushed with
    function insertNewBlock(eState, t, s) {
        const selection = eState.getSelection();
        const contentState = eState.getCurrentContent();
        const currentBlock = contentState.getBlockForKey(selection.getEndKey());
        const blockMap = contentState.getBlockMap();

        // Split the blocks
        const blocksBefore = blockMap.toSeq().takeUntil((v) => { return v === currentBlock; });
        const blocksAfter = blockMap.toSeq().skipUntil((v) => { return v === currentBlock; }).rest();

        const newBlockKey = genKey();

        // @ts-ignore
        const newBlocks = [[newBlockKey, new ContentBlock({ key: newBlockKey, type: s, text: t + '\n' })],
        [currentBlock.getKey(), currentBlock]];

        // Insert the new block
        const newBlockMap = blocksBefore.concat(newBlocks, blocksAfter).toOrderedMap();
        const newContentState = contentState.merge({
            blockMap: newBlockMap,
            selectionBefore: selection,
            selectionAfter: selection,
        });
        return EditorState.push(eState, newContentState, 'insert-fragment');
    }

    function testButton(event, newStyle) {
        event.preventDefault();
        setStyle(newStyle);
        console.log(style);
    }

    function insertImage(url) {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'IMAGE',
            'IMMUTABLE',
            { src: url });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, '');
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={2}>
                    <Box mx={1}>
                        <ToggleButtonGroup exclusive value={style} onChange={testButton} size="small">
                            <ToggleButton value="header-two"> <TextFieldsIcon /> </ToggleButton>
                            <ToggleButton value="header-three"> <TextFieldsIcon fontSize="small" /> </ToggleButton>
                            <ToggleButton value="unstyled"> <TextFormatIcon /> </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Box mx={1}>
                        <ButtonGroup>
                            <Button onMouseDown={() => formatText('BOLD')}><FormatBoldIcon /></Button>
                            <Button onMouseDown={() => formatText('ITALIC')}><FormatItalicIcon /></Button>
                            <Button onMouseDown={() => formatText('STRIKETHROUGH')}><FormatStrikethroughIcon /></Button>
                            <Button onMouseDown={() => formatText('UNDERLINE')}><FormatUnderlinedIcon /></Button>
                            <Button onMouseDown={() => code()}><CodeIcon /></Button>
                            <Button onMouseDown={() => saveState()}>S</Button>
                        </ButtonGroup>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box m={1}>

                        <Paper onClick={focusEditor} elevation={4}>
                            <Editor
                                ref={editor}
                                editorState={editorState}
                                onChange={setEditor}
                                customStyleMap={styleMap}
                            // blockRenderMap={blockRenderMap}
                            />
                        </Paper>
                    </Box>

                </Grid>
            </Grid>
        </div >
    );
}