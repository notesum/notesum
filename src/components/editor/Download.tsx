import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { saveAs } from 'file-saver';

import generateWordDoc from './Word';
import pdfDownload from './PdfDownload';

/**
 * Download an EditorState as a file
 * @param eState EditorState to be downloaded
 * @param extension The file extension to be used, so file type to be downloaded
 * @param name Name of the file to be downloaded
 */
export default function downloadState(eState: EditorState, extension: string, name: string): void {
    if (extension === 'html' || extension === 'txt') { htmlOrtxt(eState, extension, name); }
    else if (extension === 'docx') {generateWordDoc(eState.getCurrentContent(), name);}
    else if (extension === 'pdf') { pdfDownload(eState.getCurrentContent(), name); }

}

// TODO: handle images
// Handle .txt or .html coversion and download
function htmlOrtxt(eState: EditorState, ex: 'html' | 'txt', name: string) {

    const contents = convertToRaw(eState.getCurrentContent());
    const markup = draftToHtml(contents, true);
    const file = new Blob([markup.toString()]);
    saveAs(file, name + '.' + ex);
}