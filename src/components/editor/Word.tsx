import * as docx from 'docx';
import { saveAs } from "file-saver";


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

        pars = addBlock(pars, entry)
    }
    doc.addSection({
        children: pars
    })
    return doc;
}

// Makes a paragraph
function addBlock(pars, entry) {
    // console.log(entry);
    let lines = [];
    lines = addLines(lines, entry);

    let p = null;

    // TODO add bullet point block type
    // Headers
    if (entry.getType().substring(0, 6) === 'header') {
        p = new docx.Paragraph({
            children: lines,
            heading: getBlockType(entry.getType())
        })

        // Bullet points (each entry is a new block)
    } else if (entry.getType().substring(0, 7) === 'unorder') {
        p = new docx.Paragraph({
            children: lines,
            bullet: { level: 0 }
        })

        // Regular text
    } else {
        p = new docx.Paragraph({
            children: lines,
        })
    }

    pars.push(p);
    return pars;
}

function addLines(lines, entry) {
    let l = null;

    l = new docx.TextRun({
        text: entry.getText()
    })

    lines.push(l);
    return lines;
}

function download(doc, name) {

    console.log('Downloading');
    docx.Packer.toBlob(doc).then(blob => {
        saveAs(blob, name + '.docx');
    });
    console.log('Downloaded');


}


function getBlockType(s) {
    if (s === 'header-two') {
        return docx.HeadingLevel.HEADING_2;
    } else if (s === 'header-three') {
        return docx.HeadingLevel.HEADING_3;
    }
}