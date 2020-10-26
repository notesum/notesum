import { PersistedState } from 'redux-persist';

import { AppState } from '../reducers';

export default (state: PersistedState & AppState): PersistedState & AppState => {
    const newState = {
        ...state
    };

    for (const projectId of Object.keys(newState.projects)) {
        if ('currentOpenFile' in newState.projects[projectId]) {
            // @ts-ignore Uses old key on property
            newState.projects[projectId].lastOpenFile = newState.projects[projectId];
        }
        // @ts-ignore
        delete newState.projects[projectId].currentOpenFile;
    }

    return newState;
};