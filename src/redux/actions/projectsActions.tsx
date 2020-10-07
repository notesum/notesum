import { v4 as uuidv4 } from 'uuid';

import { ProjectsActionTypes, NEW_PROJECT, ADD_PROJECT_FILE } from '../types/projectsTypes';

export function createNewProject(name: string): ProjectsActionTypes {
    return {
        type: NEW_PROJECT,
        payload: {
            uuid: uuidv4(),
            name
        },
    };
}

export function addFileToProject(uuid: string, fileUuid: string): ProjectsActionTypes {
    return {
        type: ADD_PROJECT_FILE,
        payload: {
            uuid,
            fileUuid
        }
    };
}