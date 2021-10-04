import { Dispatch } from 'react';
import { ContentState, convertToRaw } from 'draft-js';

import { Files, FilesActionsTypes, FILE_EDITOR_SAVE, NEW_FILE, ProjectFile } from '../types/filesTypes';
import { updateFileList } from '../actions/filesActions';
import { addFileToProject, setLastOpenFile } from '../actions/projectActions';
import { ProjectActionTypes } from '../types/projectTypes';
import { REDIRECT, RedirectActionTypes } from '../types/redirectTypes';

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
            const json = (await result.json());

            if (!('data' in json)) return;

            const files: Files = json.data.reduce((obj: Files, item) => {
                delete item.project_id;

                if (item.summary == null) {
                    item.summary = convertToRaw(ContentState.createFromText(''));
                } else {
                    item.summary = JSON.parse(item.summary);
                }

                return {
                    ...obj,
                    [item.id]: item,
                };
            }, {});

            dispatch(updateFileList(files));
        })();
    };

}

export function createFileVistor(projectId: string, pdf: File) {
    return (dispatch: Dispatch<FilesActionsTypes | ProjectActionTypes | RedirectActionTypes>, getState) => {
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

            const result = await fetch(`${BASE_URL}/files_upload`, requestOptions);
            const json = (await result.json());

            if (!('data' in json)) {
                return;
            }

            dispatch({
                type: NEW_FILE,
                payload: {
                    id: json.data.id,
                    title: json.data.title,
                    pdf: json.data.pdf
                }
            });

            dispatch(addFileToProject(projectId, json.data.id));
            dispatch({
                type: REDIRECT,
                payload: `/project/${projectId}/${json.data.id}`
            });
            dispatch(setLastOpenFile(projectId, json.data.id));

        })();
    };
}

export function createFile(projectId: string, pdf: File) {
    return (dispatch: Dispatch<FilesActionsTypes | ProjectActionTypes | RedirectActionTypes>, getState) => {
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
            const json = (await result.json());

            if (!('data' in json)) {
                return;
            }

            dispatch({
                type: NEW_FILE,
                payload: {
                    id: json.data.id,
                    title: json.data.title,
                    pdf: json.data.pdf
                }
            });

            dispatch(addFileToProject(projectId, json.data.id));
            dispatch({
                type: REDIRECT,
                payload: `/project/${projectId}/${json.data.id}`
            });
            dispatch(setLastOpenFile(projectId, json.data.id));

        })();
    };
}

export function saveFile(fileId: string) {
    return (dispatch: Dispatch<FilesActionsTypes | ProjectActionTypes>, getState) => {
        const file: ProjectFile = getState().files[fileId];

        (async () => {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().auth.token}`
                },
                body: JSON.stringify({
                    title: file.title,
                    summary: JSON.stringify(file.summary)
                })
            };

            const result = await fetch(`${BASE_URL}/files/${fileId}`, requestOptions);

            if (result.status !== 200) return;

            dispatch({
                type: FILE_EDITOR_SAVE,
                payload: {
                    id: fileId
                }
            });

        })();
    };
}