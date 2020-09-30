import React, { useEffect, useState, useRef, useMemo, createRef, RefObject } from 'react';
import { GlobalWorkerOptions, getDocument, version } from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/display/api';
import 'pdfjs-dist/web/pdf_viewer.css';
import { Paper, Box, AppBar, Toolbar, IconButton, makeStyles, InputBase } from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

import BookmarksMenu from './BookmarksMenu';
import Page from './Page';

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

type PdfProps = {
    file: string,
    hidden?: boolean,
    fitToWidth?: boolean,
    width?: number,
};

const useStyles = makeStyles(() => ({
    pageBox: {
        padding: '2px 8px',
        marginRight: '20px',
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
    },
    pageNumber: {
        marginBottom: '-5px',
        width: '50px'
    },
    grow: {
        flexGrow: 1
    }
}));

export default function Pdf({ file, fitToWidth, hidden }: PdfProps) {

    const [document, setDocument] = useState<PDFDocumentProxy>(null);
    const [pages, setPages] = useState<PDFPageProxy[]>([]);

    const [scale, setScale] = useState(1.5);

    const pageRefs: RefObject<HTMLDivElement>[] = useMemo(() => Array.from({ length: pages.length }).map(() => createRef()), [pages]);
    const [visiblePages, setVisiblePages] = useState({});

    const [outline, setOutline] = useState(null);

    const mainView = useRef<HTMLDivElement>(null);

    const classes = useStyles();

    const currentPage = useMemo(() => {
        for (let i = 0; i < pages.length; i++) {
            if (i in visiblePages && visiblePages[i].visible) {
                return i;
            }
        }
        return 0;
    }, [visiblePages]);

    // Load document
    useEffect(() => {
        (async () => {
            const doc = await getDocument({ url: file }).promise;
            setDocument(doc);
            setOutline(await doc.getOutline());
        })();
    }, []);

    useEffect(() => {
        scrollToPage(currentPage);
    }, [scale]);

    // Render page / document
    useEffect(() => {
        if (document == null) return;

        (async () => {
            const pagePromises = [];
            for (let i = 1; i <= document.numPages; i++) {
                pagePromises.push(document.getPage(i));
            }

            setPages(await Promise.all(pagePromises));
        })();
    }, [document]);

    // TODO: Find a way to do this which works, and is quicker. This way is more stable, but the virtualDOM needs to recalculate all pages of the PDF
    // However doing it for each page individually seems unstable for some reason..
    useEffect(() => {
        if (pageRefs.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            setVisiblePages((oldVisible) => {
                // @ts-ignore: manual says: too lazy to cast to HTMLDivElement
                return { ...oldVisible, ...Object.fromEntries(entries.map((entry) => [entry.target.dataset.id, {
                    visible: entry.isIntersecting,
                }])) };
            });

        }, { threshold: [0] });

        pageRefs.forEach((ref) => {
            observer.observe(ref.current);
        });

        return observer.disconnect;
    }, [pageRefs]);

    const onNavigate = async (loc: [{ num: number, gen: number }] | string) => {
        if (typeof loc === 'string') {
            // @ts-ignore: mistake in types of PDF.js
            loc = await document.getDestination(loc);
        }

        // @ts-ignore: mistake in types of PDF.js
        scrollToPage(await document.getPageIndex(loc[0]));
    };

    const scrollToPage = (page: number) => {
        if (!(page in pageRefs)) return;
        mainView.current.scrollTop = pageRefs[page].current.offsetTop - mainView.current.offsetTop + 15;
    };

    const pageBoxRef = useRef(null);
    const [pageBoxValue, setPageBoxValue] = useState('');
    const setPageBox = () => {
        if (pageBoxValue === '') return;
        scrollToPage(parseInt(pageBoxValue, 10) - 1);
        setPageBoxValue('');
    };

    return (
        <Box flexDirection="column" display="flex" width="100%" height="100%" >
            <AppBar position="static" color="transparent">
                <Toolbar variant="dense">
                    {document && <Paper elevation={2} className={classes.pageBox}>
                        <InputBase ref={pageBoxRef} value={pageBoxValue} className={classes.pageNumber} placeholder={`${currentPage+1}`} inputProps={{ 'aria-label': 'search' }}
                            onKeyPress={(e) => {
                                if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
                                    e.preventDefault();
                                }

                                if (e.key === 'Enter') {
                                    setPageBox();
                                }
                            }} onChange={e => { setPageBoxValue(e.target.value); }} onBlur={setPageBox} />
                        <i>of {document.numPages}</i>
                    </Paper>}

                    {!fitToWidth && <>
                        <IconButton onClick={() => setScale(scale + 0.1)} edge="start" aria-label="menu">
                            <ZoomInIcon />
                        </IconButton>

                        <IconButton onClick={() => setScale(scale - 0.1)} edge="start" aria-label="menu">
                            <ZoomOutIcon />
                        </IconButton>
                    </>}
                    <div className={classes.grow} />
                    {outline &&
                        <BookmarksMenu outline={outline} onNavigate={onNavigate} />
                    }
                </Toolbar>
            </AppBar>

            <Box flexGrow={1} style={{
                minHeight: '0',
                backgroundColor: '#eee'
            }}>
                <div ref={mainView} hidden={hidden} className="pdfViewer" style={{
                    height: '100%',
                    overflow: 'auto',
                    overflowY: 'scroll'
                }}>
                    {pages.map((page, id) => {
                        return (<Page ref={pageRefs[id]} isVisible={id in visiblePages && visiblePages[id].visible} hidden={hidden} key={id}
                                      scale={fitToWidth ? null : scale} width={fitToWidth ? mainView.current.clientWidth - 18 : null} page={page} />);
                    })}
                </div>

                <div hidden={!hidden} style={{
                    height: '100%',
                    overflow: 'auto',
                    overflowY: 'scroll',
                    backgroundColor: 'white'
                }} />
            </Box>
        </Box>
    );
}