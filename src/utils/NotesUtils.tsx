import { Note, Notes } from '../redux/types/noteType';
import { Files } from '../redux/types/filesTypes';

export function extractedNotes(filesState: Files, notesState: Notes, fileId: number): Note[] {
    return filesState[fileId].notes.map((noteId) => {
        if(noteId in notesState){
            return notesState[noteId];
        }
        throw new Error('Notes were not received from the backend!');
    });
}