import { Dispatch } from 'react';

import {NEW_NOTE, Note, NoteActionsTypes, Notes} from '../types/noteType';
import { FilesActionsTypes } from '../types/filesTypes';
import {addNoteToFile, removeNoteFromFile, updateEditor} from '../actions/filesActions';
import {deleteNote, updateNotesList} from '../actions/noteActions';

import { BASE_URL } from './ServerSettings';


export function createNote(fileId: number, note: Note){
    return (dispatch: Dispatch<NoteActionsTypes | FilesActionsTypes>, getState) => {
        (async () => {
            if(getState().auth.isLoggedIn){
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${getState().auth.token}`
                    },
                    body: JSON.stringify(note),
                    redirect: 'follow' as const
                };

                dispatch({
                    type: NEW_NOTE,
                    payload: note
                });
                dispatch(addNoteToFile(note.id, fileId));

                const result = await fetch(`${BASE_URL}/notes`, requestOptions);
                const json = (await result.json());

                if(!('data' in json)){
                    return;
                }
            } else {
                dispatch({
                    type: NEW_NOTE,
                    payload: note
                });
                dispatch(addNoteToFile(note.id, fileId));
            }
        })();
    };
}

export function loadNotes() {
    return (dispatch: Dispatch<NoteActionsTypes>, getState) => {
        (async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            };
            const result = await fetch(`${BASE_URL}/notes`, requestOptions);

            const json = (await result.json());

            if(!('data' in json)){
                return;
            }

            const notes: Notes = json.data.reduce((obj: Notes, item) => {
                return {
                    ...obj,
                    [item.id]: item
                };
            }, {});
            dispatch(updateNotesList(notes));

        })();
    };
}