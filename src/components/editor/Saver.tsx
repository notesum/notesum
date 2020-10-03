import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { saveAs } from 'file-saver';


import generateWordDoc from './Word';

// Save the editor state with the given extension type ex
export default function saveState(eState: EditorState, extension: string, name: string) {
    const contents = convertToRaw(eState.getCurrentContent());
    const markup = draftToHtml(contents, true);

    if (extension === 'html' || extension === 'txt') { htmlOrtxt(markup, extension, name); }
    else if (extension === 'docx') {generateWordDoc(eState.getCurrentContent(), name);}
}

function htmlOrtxt(markup: any, ex: 'html' | 'txt', name: string) {
    const file = new Blob([markup.toString()]);
    saveAs(file, name + '.' + ex);
}