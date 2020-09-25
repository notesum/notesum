import * as docx from 'docx';
import { saveAs } from "file-saver";
import ContentState from 'draft-js';



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
    for (const block of blocks) {
        const entry = block[1];
        if (entry.getText().length > 0) {
            // TODO add the contents of this block
        } else {
            // TODO make a space
        }
    }
}

function download(doc, name){

    docx.Packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, name+'.docx');
        console.log("Document created successfully");
      });

}