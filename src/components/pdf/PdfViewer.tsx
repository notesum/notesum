import * as React from 'react';
import { ReactElement } from 'react';
import { version } from 'pdfjs-dist';
import { Button, DocumentLoadEvent, PdfJs, Position, PrimaryButton, Tooltip, Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin, ToolbarProps } from '@react-pdf-viewer/default-layout';
import { HighlightArea, highlightPlugin, MessageIcon } from '@react-pdf-viewer/highlight';
import { RenderHighlightContentProps, RenderHighlightTargetProps, RenderHighlightsProps } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

type Note = {
    id: number;
    content: string;
    highlightAreas: HighlightArea[];
    quote: string;
};

interface HighlightExampleProps {
    fileUrl: string;
    notes: Note[];
    notesCallback: (notes: Note[]) => void;
}

const PdfViewer: React.FC<HighlightExampleProps> = ({ fileUrl, notes, notesCallback }) => {
    const [message, setMessage] = React.useState('');
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

    const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
        <div
            style={{
                background: '#eee',
                display: 'flex',
                position: 'absolute',
                left: `${props.selectionRegion.left}%`,
                top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                transform: 'translate(0, 8px)',
            }}
        >
            <Tooltip
                position={Position.TopCenter}
                target={<Button onClick={props.toggle}><MessageIcon /></Button>}
                content={() => <div style={{ width: '100px' }}>Add a note</div>}
                offset={{ left: 0, top: -8 }}
            />
        </div>
    );

    const renderHighlightContent = (props: RenderHighlightContentProps) => {
        const addNote = () => {
            if (message !== '') {
                const note: Note = {
                    id: ++noteId,
                    content: message,
                    highlightAreas: props.highlightAreas,
                    quote: props.selectedText,
                };
                notesCallback(notes.concat([note]));
                props.cancel();
            }
        };

        return (
            <div
                style={{
                    background: '#fff',
                    border: '1px solid rgba(0, 0, 0, .3)',
                    borderRadius: '2px',
                    padding: '8px',
                    position: 'absolute',
                    left: `${props.selectionRegion.left}%`,
                    top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                    zIndex: 1,
                }}
            >
                <div>
                    <textarea
                        rows={3}
                        style={{
                            border: '1px solid rgba(0, 0, 0, .3)',
                        }}
                        onChange={e => setMessage(e.target.value)}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginTop: '8px',
                    }}
                >
                    <div style={{ marginRight: '8px' }}>
                        <PrimaryButton onClick={addNote}>Add</PrimaryButton>
                    </div>
                    <Button onClick={props.cancel}>Cancel</Button>
                </div>
            </div>
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
        renderHighlightContent,
        renderHighlights,
    });

    const { jumpToHighlightArea } = highlightPluginInstance;

    React.useEffect(() => {
        return () => {
            noteEles.clear();
        };
    }, []);

    const sidebarNotes = (
        <div
            ref={notesContainerRef}
            style={{
                overflow: 'auto',
                width: '100%',
            }}
        >
            {notes.length === 0 && <div style={{ textAlign: 'center' }}>There is no note</div>}
            {
                notes.map(note => {
                    return (
                        <div
                            key={note.id}
                            style={{
                                borderBottom: '1px solid rgba(0, 0, 0, .3)',
                                cursor: 'pointer',
                                padding: '8px',
                            }}
                            onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
                            ref={(ref): void => {
                                noteEles.set(note.id, ref as HTMLElement);
                            }}
                        >
                            <blockquote
                                style={{
                                    borderLeft: '2px solid rgba(0, 0, 0, 0.2)',
                                    fontSize: '.75rem',
                                    lineHeight: 1.5,
                                    margin: '0 0 8px 0',
                                    paddingLeft: '8px',
                                    textAlign: 'justify',
                                }}
                            >
                                {note.quote}
                            </blockquote>
                            {note.content}
                        </div>
                    );
                })
            }
        </div>
    );

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
        ].concat({
            content: sidebarNotes,
            icon: <MessageIcon />,
            title: <>Notes</>,
        }),
        renderToolbar
    });
    const { activateTab } = defaultLayoutPluginInstance;
    return (
        <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`}>
            <Viewer
                fileUrl={fileUrl}
                plugins={[
                    highlightPluginInstance,
                    defaultLayoutPluginInstance,
                ]}
                onDocumentLoad={handleDocumentLoad}
            />
        </Worker>
    );
};

export default PdfViewer;
export type { Note };