import * as docx from 'docx';
import { Media } from 'docx';
import { ContentState } from 'draft-js';
import { saveAs } from 'file-saver';

/**
 * Generate and download a Word Document based on a content state
 * @param contentState Content state of the editor
 * @param name Name of the file to be downloaded
 */
export default function generateWordDoc(contentState: ContentState, name: string): void {

    const doc = new docx.Document({
        creator: 'NoteSum',
        description: 'NoteSum Summary',
        title: name,
    });
    const filled = fillWithData(doc, contentState);
    download(filled, name);
}

/**
 * Populate a given Word Document witha content state
 * @param doc The document being populated
 * @param contentState Content state to be downloaded
 */
function fillWithData(doc: docx.Document, contentState): docx.Document {

    const blocks = contentState.getBlockMap();
    let paragraphs = [];

    // Iterate the entries of the content state and add them as paragraph objects
    for (const block of blocks) {
        const entry = block[1]; // Every entry is sort of a paragraph

        paragraphs = addBlock(paragraphs, entry, contentState, doc);
    }
    doc.addSection({
        children: paragraphs
    });
    return doc;
}

// Makes a paragraph
function addBlock(paragraphs, entry, contentState, doc) {

    // Lines of a paragraph
    const lines = [];
    addLines(lines, entry);

    // The pragraph being created
    let p = null;
    // Headers
    if (entry.getType().substring(0, 6) === 'header') {
        p = new docx.Paragraph({
            children: lines,
            heading: getBlockType(entry.getType())
        });
        // Bullet points (each entry is a new block)
    } else if (entry.getType().substring(0, 7) === 'unorder') {
        p = new docx.Paragraph({
            children: lines,
            bullet: { level: 0 }
        });
        // Regular text
    } else if (entry.getType() === 'unstyled') {
        p = new docx.Paragraph({
            children: lines,
        });
        // Images
    } else if (entry.getType() === 'atomic' || entry.getType() === 'img') {
        try {
            const data = contentState.getEntity(entry.getEntityAt(0)).getData().src.toString();
            const s = new Image();
            s.src = data;
            const image1 = Media.addImage(doc, data, s.width / 1.3, s.height / 1.3); // TODO please less hacky
            p = new docx.Paragraph(image1);
        } catch (e) {
            console.log(`Image saving might have gone bad\n ${e.message}`);
            return paragraphs;
        }
    }
    paragraphs.push(p);
    return paragraphs;
}

function addLines(lines, entry) {
    // TODO: parse the inline styles, probably from the entity map like the images (entity ranges)

    lines.push(new docx.TextRun({
        text: entry.getText()
    }));
    return lines;
}

// Given a document object and name, actually download
function download(doc, name) {
    docx.Packer.toBlob(doc).then(blob => {
        saveAs(blob, name + '.docx');
    });
}

// Convert header types to docx ones
function getBlockType(s) {
    if (s === 'header-two') {
        return docx.HeadingLevel.HEADING_2;
    } else if (s === 'header-three') {
        return docx.HeadingLevel.HEADING_3;
    }
}