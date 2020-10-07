export const NEW_PROJECT = 'NEW_PROJECT';
export interface INewProjectAction {
    readonly type: typeof NEW_PROJECT;
    payload: {
        uuid: string,
        name: string
    };
}

export const DELETE_PROJECT = 'DELETE_PROJECT';
export interface IDeleteProject {
    readonly type: typeof DELETE_PROJECT;
    payload: {
        uuid: string,
    };
}

export const UPDATE_PROJECT_NAME = 'UPDATE_PROJECT_NAME';
export interface IUpdateProjectNameAction {
    readonly type: typeof UPDATE_PROJECT_NAME;
    payload: {
        uuid: string,
        name: string
    };
}

export const ADD_PROJECT_FILE = 'ADD_PROJECT_FILE';
export interface IAddProjectFileAction {
    readonly type: typeof ADD_PROJECT_FILE;
    payload: {
        uuid: string,
        fileUuid: string
    };
}

export const REMOVE_PROJECT_FILE = 'REMOVE_PROJECT_FILE';
export interface IRemoveProjectFileAction {
    readonly type: typeof REMOVE_PROJECT_FILE;
    payload: {
        uuid: string,
        fileUuid: string
    };
}

export type ProjectsActionTypes =
    | INewProjectAction
    | IDeleteProject
    | IUpdateProjectNameAction
    | IAddProjectFileAction
    | IRemoveProjectFileAction;

export interface ProjectsState {
    [uuid: string]: {
        uuid: string,
        name: string,
        files: string[]
    };
}