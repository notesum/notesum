import { Note, Notes } from '../redux/types/noteType';
import { Files } from '../redux/types/filesTypes';

export function extractedNotes(filesState: Files, notesState: Notes, fileId: string): Note[] {
    return filesState[fileId].notes.map((noteId) => notesState[noteId]);
}