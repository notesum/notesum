export const NEW_PROJECT = 'NEW_PROJECT';
export interface INewProjectAction {
    readonly type: typeof NEW_PROJECT;
    payload: {
        id: string,
        name: string
    };
}

export const DELETE_PROJECT = 'DELETE_PROJECT';
export interface IDeleteProject {
    readonly type: typeof DELETE_PROJECT;
    payload: {
        id: string,
    };
}

export const UPDATE_PROJECT_NAME = 'UPDATE_PROJECT_NAME';
export interface IUpdateProjectNameAction {
    readonly type: typeof UPDATE_PROJECT_NAME;
    payload: {
        id: string,
        name: string
    };
}

export const ADD_PROJECT_FILE = 'ADD_PROJECT_FILE';
export interface IAddProjectFileAction {
    readonly type: typeof ADD_PROJECT_FILE;
    payload: {
        id: string,
        fileId: string
    };
}

export const REMOVE_PROJECT_FILE = 'REMOVE_PROJECT_FILE';
export interface IRemoveProjectFileAction {
    readonly type: typeof REMOVE_PROJECT_FILE;
    payload: {
        id: string,
        fileId: string
    };
}

export const UPDATE_PROJECT_LIST = 'UPDATE_PROJECT_LIST';
export interface IUpdateProjectList {
    readonly type: typeof UPDATE_PROJECT_LIST;
    payload: ProjectsState;
}

export const SET_OPEN_PROJECT_FILE = 'SET_OPEN_PROJECT_FILE';
export interface ISetOpenProjectFile {
    readonly type: typeof SET_OPEN_PROJECT_FILE;
    payload: {
        id: string,
        fileId: string
    };
}

export type ProjectActionTypes =
    | INewProjectAction
    | IDeleteProject
    | IUpdateProjectNameAction
    | IAddProjectFileAction
    | IRemoveProjectFileAction
    | IUpdateProjectList
    | ISetOpenProjectFile;

export interface Project {
    id: string;
    name: string;
    files: string[];
    lastOpenFile?: string;
}

export interface ProjectsState {
    [id: string]: Project;
}