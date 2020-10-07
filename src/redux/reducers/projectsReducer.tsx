import { ProjectsActionTypes, ProjectsState, NEW_PROJECT, UPDATE_PROJECT_NAME, ADD_PROJECT_FILE, REMOVE_PROJECT_FILE, DELETE_PROJECT } from '../types/projectsTypes';

const initialState: ProjectsState = {};

const projectsReducer = (state = initialState, action: ProjectsActionTypes): ProjectsState => {
    switch (action.type) {
        case NEW_PROJECT:
            return {
                ...state,
                [action.payload.uuid]: {
                    uuid: action.payload.uuid,
                    name: action.payload.name,
                    files: []
                }
            };

        case DELETE_PROJECT:
            const updatedState = {
                ...state,
            };
            delete updatedState[action.payload.uuid];
            return updatedState;

        case UPDATE_PROJECT_NAME:
            return {
                ...state,
                [action.payload.uuid]: {
                    ...state[action.payload.uuid],
                    name: action.payload.name
                }
            };

        case ADD_PROJECT_FILE:
            return {
                ...state,
                [action.payload.uuid]: {
                    ...state[action.payload.uuid],
                    files: [...state[action.payload.uuid].files, action.payload.fileUuid]
                }
            };

        case REMOVE_PROJECT_FILE:
            return {
                ...state,
                [action.payload.uuid]: {
                    ...state[action.payload.uuid],
                    files: state[action.payload.uuid].files.filter((file) => file !== action.payload.fileUuid)
                }
            };

        default:
            return state;
    }
};

export default projectsReducer;