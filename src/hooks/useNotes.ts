import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {Files} from '../redux/types/filesTypes';
import {Note, Notes} from '../redux/types/noteType';

const useNotes = (fileId: string) => {
    const filesState: Files = useSelector((state: any) => state.files);
    const notesState: Notes = useSelector((state: any) => state.notes);
    const [notes, setNotes] = useState<Note[]>([]);

    // useEffect(() => {
    //     const noteIds: number[] = filesState[fileId].notes;
    //     const lastNote: Note = notesState[noteIds[noteIds.length - 1]];
    //     setNotes(notes.concat([lastNote]));
    //     console.log('Concatenated:', notes.concat([lastNote]));
    //     console.log('Notes:', notes);
    //     console.log('NoesState:', notesState);
    //     console.log('FilesState:', filesState);
    // }, [notesState]);
    //
    // useEffect(() => {
    //     const initialNotes: Note[] = filesState[fileId].notes.map((noteId) => notesState[noteId]);
    //     setNotes(notes.concat(initialNotes));
    // },[]);

    return notes;
};

export default useNotes;