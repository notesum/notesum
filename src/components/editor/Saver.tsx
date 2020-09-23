import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

// Save the editor state with the given extension type ex
export default function saveState(eState, extension) {
    const contents = convertToRaw(eState.getCurrentContent());
    const markup = draftToHtml(contents, true);

    if (extension === 'html' || extension === 'txt') { htmlOrtxt(markup, extension); }
    else if (extension === 'docx') {docx(markup);}
}

function htmlOrtxt(markup, ex) {
    const element = document.createElement('a');
    const file = new Blob([markup.toString()]);
    element.href = URL.createObjectURL(file);
    element.download = 'myFile.' + ex;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}


function docx(markup) {
    console.log('Sadness');
}