import { Dispatch } from 'react';

import { NEW_PROJECT, ProjectActionTypes, ProjectsState } from '../types/projectTypes';
import { updateProjectsList } from '../actions/projectActions';

import { BASE_URL } from './ServerSettings';


export function loadProjects() {
    return (dispatch: Dispatch<ProjectActionTypes>, getState) => {
        (async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().auth.token}`
                }
            };

            const result = await fetch(`${BASE_URL}/projects`, requestOptions);

            const projects: ProjectsState = (await result.json()).data.reduce((obj: ProjectsState, item) => {
                item.files = item.files.map((file) => file.id);

                return {
                    ...obj,
                    [item.id]: item,
                };
            }, {});

            dispatch(updateProjectsList(projects));
        })();
    };

}

export function createNewProject(name: string) {
    return (dispatch: Dispatch<ProjectActionTypes>, getState) => {
        (async () => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${getState().auth.token}`
                },
                body: JSON.stringify({
                    name
                })
            };

            const result = await fetch(`${BASE_URL}/projects`, requestOptions);
            const json: {data: {id: string, name: string}} | {message: string} = (await result.json());

            if (!('data' in json)) return;

            dispatch({
                type: NEW_PROJECT,
                payload: {
                    id: json.data.id,
                    name: json.data.name
                }
            });
        })();
    };
}