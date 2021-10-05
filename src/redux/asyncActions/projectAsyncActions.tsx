import { Dispatch } from 'react';

import { UPDATE_PROJECT_NAME,NEW_PROJECT, ProjectActionTypes, ProjectsState } from '../types/projectTypes';
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


export function deleteEmptyProject(name: string,user_id: BigInteger,project_id: BigInteger) {
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
                    name,user_id,project_id
                })
            };

            const result = await fetch(`${BASE_URL}/delete_project`, requestOptions);
            // const json: {data: {id: string, name: string}} | {message: string} = (await result.json());

            // if (!('data' in json)) return;

            
            
        })();
    };
}
export function updateProjectName(name: string,user_id: BigInteger,project_id: BigInteger) {
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
                    name,user_id,project_id
                })
            };

            const result = await fetch(`${BASE_URL}/update_name`, requestOptions);
            const json: {data: {id: string, name: string}} | {message: string} = (await result.json());

            if (!('data' in json)) return;

            dispatch({
                type: UPDATE_PROJECT_NAME,
                payload: {
                    id: json.data.id,
                    name: json.data.name
                }
            });
            
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
            const json: {data: {id: string, name: string}} | {message: string} = (await result.json());

            if (!('data' in json)) return;

            dispatch({
                type: NEW_PROJECT,
                payload: {
                    id: json.data.id,
                    name: json.data.name
                }
            });

            dispatch({
                type: REDIRECT,
                payload: `/project/${json.data.id}`
            });
        })();
    };
}



export function createNewProjectVistior(name: string,id) {
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

            const result = await fetch(`${BASE_URL}/projects_visitor`, requestOptions);
            const json: {data: {id: string, name: string}} | {message: string} = (await result.json());

            if (!('data' in json)) return;

            dispatch({
                type: NEW_PROJECT,
                payload: {
                    id: json.data.id,
                    name: json.data.name
                }
            });
            id(json.data.id)
        })();
    };
}