import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import generateWordDoc from './Word';

// Save the editor state with the given extension type ex
export default function saveState(eState, extension, name) {
    const contents = convertToRaw(eState.getCurrentContent());
    const markup = draftToHtml(contents, true);

    if (extension === 'html' || extension === 'txt') { htmlOrtxt(markup, extension); }
    else if (extension === 'docx') {generateWordDoc(eState.getCurrentContent(), name);}
}

function htmlOrtxt(markup, ex) {
    const element = document.createElement('a');
    const file = new Blob([markup.toString()]);
    element.href = URL.createObjectURL(file);
    element.download = 'myFile.' + ex;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}

