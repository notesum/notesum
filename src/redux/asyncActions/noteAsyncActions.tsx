import { Dispatch } from 'react';

import { NEW_NOTE, Note, NoteActionsTypes } from '../types/noteType';
import { FilesActionsTypes } from '../types/filesTypes';
import { addNoteToFile } from '../actions/filesActions';

import { BASE_URL } from './ServerSettings';


export function createNote(fileId: string, note: Note){
    return (dispatch: Dispatch<NoteActionsTypes | FilesActionsTypes>, getState) => {
        (async () => {
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
            const result = await fetch(`${BASE_URL}/files/${fileId}/notes`, requestOptions);
            const json = (await result.json());

            if(!('data' in json)){
                return;
            }

            dispatch({
                type: NEW_NOTE,
                payload: json.data
            });

            dispatch(addNoteToFile(json.data.id, fileId));
        })();
    };
}