import { ProjectActionTypes, ADD_PROJECT_FILE, UPDATE_PROJECT_LIST, ProjectsState } from '../types/projectTypes';

export function updateProjectsList(projects: ProjectsState): ProjectActionTypes {
    return {
        type: UPDATE_PROJECT_LIST,
        payload: projects
    };
}

export function addFileToProject(id: string, fileId: string): ProjectActionTypes {
    return {
        type: ADD_PROJECT_FILE,
        payload: {
            id,
            fileId
        }
    };
}