import * as React from 'react';
import {ReactElement} from 'react';
import { GlobalWorkerOptions, version} from 'pdfjs-dist';
import { DocumentLoadEvent, PdfJs, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin, ToolbarProps } from '@react-pdf-viewer/default-layout';
import { HighlightArea, highlightPlugin } from '@react-pdf-viewer/highlight';
import { RenderHighlightTargetProps, RenderHighlightsProps } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

type Note = {
    id: number;
    content: string;
    highlightAreas: HighlightArea[];
    quote: string;
};

interface PdfViewerProps {
    fileUrl: string;
    notes: Note[];
    notesCallback: (notes: Note[]) => void;
    screenshot: boolean;
    setScreenshotCallback: (img: string) => null;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl, notes, notesCallback }) => {
    const notesContainerRef = React.useRef<HTMLDivElement | null>(null);
    let noteId = notes.length;

    const noteEles: Map<number, HTMLElement> = new Map();
    const [currentDoc, setCurrentDoc] = React.useState<PdfJs.PdfDocument | null>(null);

    const handleDocumentLoad = (e: DocumentLoadEvent) => {
        setCurrentDoc(e.doc);
        if (currentDoc && currentDoc !== e.doc) {
            // User opens new document
            notesCallback([]);
        }
    };

    const renderHighlightTarget = (props: RenderHighlightTargetProps) => {
        const note: Note = {
            id: ++noteId,
            content: '',
            highlightAreas: props.highlightAreas,
            quote: props.selectedText,
        };
        notesCallback(notes.concat([note]));
        props.cancel();
        return (
           <div/>
        );
    };

    const jumpToNote = (note: Note) => {
        activateTab(1);
        const notesContainer = notesContainerRef.current;
        if (noteEles.has(note.id) && notesContainer) {
            notesContainer.scrollTop = noteEles.get(note.id).getBoundingClientRect().top;
        }
    };

    const renderHighlights = (props: RenderHighlightsProps) => (
        <div>
            {
                notes.map(note => (
                    <React.Fragment key={note.id}>
                        {
                            note.highlightAreas
                                .filter(area => area.pageIndex === props.pageIndex)
                                .map((area, idx) => (
                                    <div
                                        key={idx}
                                        style={
                                            Object.assign({}, {
                                                background: 'yellow',
                                                opacity: 0.4,
                                            }, props.getCssProperties(area, props.rotation))
                                        }
                                        onClick={() => jumpToNote(note)}
                                    />
                                ))
                        }
                    </React.Fragment>
                ))
            }
        </div>
    );

    const highlightPluginInstance = highlightPlugin({
        renderHighlightTarget,
        renderHighlights
    });

    React.useEffect(() => {
        return () => {
            noteEles.clear();
        };
    }, []);

    const renderToolbar = (Toolbar: ((props: ToolbarProps) => ReactElement)) => (
        <Toolbar>
            {
                (slots) => {
                    const { CurrentPageInput, NumberOfPages, Zoom, ZoomIn, ZoomOut } = slots;
                    return (
                        <div
                            style={{
                                alignItems: 'center',
                                display: 'flex',
                            }}
                        >
                            <div style={{ padding: '0px 2px' }}>
                                <CurrentPageInput /> / <NumberOfPages />
                            </div>
                            <div style={{ padding: '0px 2px',
                                          marginLeft: 'auto'}}>
                                <ZoomOut />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <Zoom />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <ZoomIn />
                            </div>
                        </div>
                    );
                }
            }
        </Toolbar>
    );

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: defaultTabs => [
            defaultTabs[1]            // Bookmarks tab
        ],
        renderToolbar
    });
    const { activateTab } = defaultLayoutPluginInstance;
    return (
        <Viewer
            fileUrl={fileUrl}
            plugins={[
                highlightPluginInstance,
                defaultLayoutPluginInstance,
            ]}
            onDocumentLoad={handleDocumentLoad}
        />
    );
};

export default PdfViewer;
export type { Note };