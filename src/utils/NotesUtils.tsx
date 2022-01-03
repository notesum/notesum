import { Note, Notes } from '../redux/types/noteType';
import { Files } from '../redux/types/filesTypes';

export function extractNotes(filesState: Files, notesState: Notes, fileId: number): Note[] {
    return filesState[fileId].notes.map((noteId) => notesState[noteId])
                                   .filter(note => note !== undefined);
}