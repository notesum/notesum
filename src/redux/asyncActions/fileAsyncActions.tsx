import { Dispatch } from 'react';
import { ContentState, convertToRaw } from 'draft-js';

import { Files, FilesActionsTypes, NEW_FILE } from '../types/filesTypes';
import { updateFileList } from '../actions/filesActions';
import { addFileToProject } from '../actions/projectActions';
import { ProjectActionTypes } from '../types/projectTypes';

import { BASE_URL } from './ServerSettings';

export function loadFiles() {
    return (dispatch: Dispatch<FilesActionsTypes>, getState) => {
        (async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            };

            // TODO handle errors
            const result = await fetch(`${BASE_URL}/files`, requestOptions);

            const files: Files = (await result.json()).data.reduce((obj: Files, item) => {
                delete item.project_id;
                item.summary = convertToRaw(ContentState.createFromText(''));

                return {
                    ...obj,
                    [item.id]: item,
                };
            }, {});

            dispatch(updateFileList(files));
        })();
    };

}

export function createFile(projectId: string, title: string, pdf: File) {
    return (dispatch: Dispatch<FilesActionsTypes | ProjectActionTypes>, getState) => {
        (async () => {
            const formData = new FormData();
            formData.append('project_id', projectId);
            formData.append('file', pdf);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().auth.token}`
                },
                body: formData
            };

            const result = await fetch(`${BASE_URL}/files`, requestOptions);
            console.log(result);

            const json = (await result.json());
            console.log(json);

            dispatch({
                type: NEW_FILE,
                payload: {
                    id: json.id,
                    title: json.title,
                    pdf: json.pdf
                }
            });

            dispatch(addFileToProject(projectId, json.id));
        })();
    };
}