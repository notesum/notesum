import { v4 as uuidv4 } from 'uuid';

import { ProjectActionTypes, NEW_PROJECT, ADD_PROJECT_FILE, UPDATE_PROJECT_LIST, ProjectsState } from '../types/projectTypes';

export function createNewProject(name: string): ProjectActionTypes {
    return {
        type: NEW_PROJECT,
        payload: {
            id: uuidv4(),
            name
        },
    };
}

export function updateProjectsList(projects: ProjectsState): ProjectActionTypes {
    return {
        type: UPDATE_PROJECT_LIST,
        payload: projects
    };
}

export function addFileToProject(id: string, fileUuid: string): ProjectActionTypes {
    return {
        type: ADD_PROJECT_FILE,
        payload: {
            id,
            fileUuid
        }
    };
}