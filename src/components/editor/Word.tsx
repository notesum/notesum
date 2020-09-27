import * as docx from 'docx';
import { saveAs } from "file-saver";
import ContentState from 'draft-js';
import { url } from 'inspector';



export default function generateWordDoc(contentState, name) {

    const doc = new docx.Document({
        creator: "NoteSum",
        description: "NoteSum Summary",
        title: name,
    });

    const filled = fillWithData(doc, contentState);
    download(filled, name);

      
}

function fillWithData(doc, contentState) {

    const blocks = contentState.getBlockMap();
    let pars = [];

    for (const block of blocks) {
        const entry = block[1]; // Every entry is sort of a paragraph
        if (entry.getText().length > 0) {
            pars = addSection(pars, entry)
        } else {
            // TODO make a space
        }
    }

    doc.addSection({
        children: pars
    })
    return doc;
}

// Makes a paragraph
function addSection(pars, entry){
    let lines = null;

    // TODO loop for styles
    lines = new docx.TextRun({
        text: entry.getText()
    })
    const p = new docx.Paragraph({
        children: [lines]
    })

    pars.push(p);

    return pars;
}

function download(doc, name){

    console.log('Downloading');
    docx.Packer.toBlob(doc).then(blob => {
        saveAs(blob, name+'.docx');
      });
    console.log('Downloaded');


}