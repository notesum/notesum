import { v4 as uuidv4 } from 'uuid';

import { ProjectsActionTypes, NEW_PROJECT } from '../types/projectsTypes';

export function createNewProject(name: string): ProjectsActionTypes {
    return {
        type: NEW_PROJECT,
        payload: {
            uuid: uuidv4(),
            name
        },
    };
}