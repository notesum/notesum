import { Dispatch } from 'react';

import { NEW_PROJECT, ProjectActionTypes, ProjectsState } from '../types/projectTypes';
import { updateProjectsList } from '../actions/projectActions';
import { REDIRECT, RedirectActionTypes } from '../types/redirectTypes';

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

            const projects: ProjectsState = (await result.json()).data.reduce((obj: ProjectsState, item: any): ProjectsState => {
                return {
                    ...obj,
                    [item.id]: {
                        id: item.id,
                        name: item.name,
                        files: item.files.map((file: any) => file.id),
                        updatedAt: new Date(item.updated_at),
                        createdAt: new Date(item.created_at)
                    }
                };
            }, {});

            dispatch(updateProjectsList(projects));
        })();
    };

}

export function createNewProject(name: string) {
    return (dispatch: Dispatch<ProjectActionTypes | RedirectActionTypes>, getState) => {
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
            const json: {data: any} | {message: string} = (await result.json());
            console.log(json);

            if (!('data' in json)) return;

            dispatch({
                type: NEW_PROJECT,
                payload: {
                    id: json.data.id,
                    name: json.data.name,
                    files: [],
                    updatedAt: new Date(json.data.updated_at),
                    createdAt: new Date(json.data.created_at)
                }
            });

            dispatch({
                type: REDIRECT,
                payload: `/project/${json.data.id}`
            });
        })();
    };
}