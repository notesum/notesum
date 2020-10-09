import { Dispatch } from 'react';

import { ProjectActionTypes, ProjectsState } from '../types/projectTypes';
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
                return {
                    ...obj,
                    [item.id]: item,
                };
            }, {});

            dispatch(updateProjectsList(projects));
        })();
    };

}

export function createProject() {
    return (dispatch: Dispatch<ProjectActionTypes>, getState) => {


    };
}