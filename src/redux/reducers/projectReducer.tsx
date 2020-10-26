import { ProjectActionTypes, ProjectsState, NEW_PROJECT, UPDATE_PROJECT_NAME, ADD_PROJECT_FILE,
    REMOVE_PROJECT_FILE, DELETE_PROJECT, UPDATE_PROJECT_LIST, SET_OPEN_PROJECT_FILE } from '../types/projectTypes';

const initialState: ProjectsState = {};

const projectReducer = (state = initialState, action: ProjectActionTypes): ProjectsState => {
    switch (action.type) {
        case UPDATE_PROJECT_LIST:
            const newState = {
                ...state
            };

            for (const projectId of Object.keys(action.payload)) {
                newState[projectId] = {
                    ...(projectId in newState ? newState[projectId] : {}),
                    ...action.payload[projectId]
                };
            }

            return newState;

        case NEW_PROJECT:
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    name: action.payload.name,
                    files: []
                }
            };

        case DELETE_PROJECT:
            const updatedState = {
                ...state,
            };
            delete updatedState[action.payload.id];
            return updatedState;

        case UPDATE_PROJECT_NAME:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    name: action.payload.name
                }
            };

        case ADD_PROJECT_FILE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    files: [...state[action.payload.id].files, action.payload.fileId]
                }
            };

        case REMOVE_PROJECT_FILE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    files: state[action.payload.id].files.filter((file) => file !== action.payload.fileId)
                }
            };

        case SET_OPEN_PROJECT_FILE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    currentOpenFile: action.payload.fileId
                }
            };

        default:
            return state;
    }
};

export default projectReducer;