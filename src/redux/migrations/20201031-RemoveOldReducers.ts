import { PersistedState } from 'redux-persist';

import { AppState } from '../reducers';

export default (state: PersistedState & AppState): PersistedState & AppState => {
    const newState = {
        ...state
    };

    // @ts-ignore Removed former key
    delete state.editor;
    // @ts-ignore
    delete state.pdf;

    return newState;
};