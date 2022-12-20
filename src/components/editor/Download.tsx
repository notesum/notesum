import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { draftToMarkdown } from 'markdown-draft-js';
import { saveAs } from 'file-saver';

import generateWordDoc from './Word';
import pdfDownload from './PdfDownload';

function draftToText(draft: RawDraftContentState): string {
  return draft.blocks
    .map(b => (!b.text.trim() && '\n') || b.text)
    .join('\n')
}

/**
 * Download an EditorState as a file
 * @param s EditorState
 * @param ext The file extension to be used, so file type to be downloaded
 * @param name Name of the file to be downloaded
 */
export default function downloadState(s: EditorState, ext: string, name: string): void {
    const draft = s.getCurrentContent();
    const fn = (name + '.' + ext)
    let fmt, blob
    switch (ext) {
      case "md":
        fmt = draftToMarkdown(convertToRaw(draft));
        blob = new Blob([fmt]);
        saveAs(blob, fn);
      break;
      case "txt":
        fmt = draftToText(convertToRaw(draft));
        blob = new Blob([fmt]);
        saveAs(blob, fn);
        break;
      case "html":
        fmt = draftToHtml(convertToRaw(draft), true);
        blob = new Blob([fmt]);
        saveAs(blob, fn);
        break;
      case "docx": generateWordDoc(draft, name); break;
      case "pdf": pdfDownload(draft, name); break;
    }
}