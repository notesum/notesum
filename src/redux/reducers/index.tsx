import { combineReducers } from 'redux';

import pdfReducer from './pdfReducer';
import editorReducer from './editorReducer';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import filesReducer from './filesReducer';
import redirectReducer from './redirectReducer';
import storage from 'redux-persist/lib/storage';
import * as t from './../types/authTypes';

const appReducer = combineReducers({
    editor: editorReducer,
    pdf: pdfReducer,
    auth: authReducer,
    projects: projectReducer,
    files: filesReducer,
    redirect: redirectReducer
});

const rootReducer = (state, action) => {
    if (action.type === t.USER_LOGOUT_SUCCESS) {
        console.log("shwing state value here at state",state);
        
        // for all keys defined in your persistConfig(s)
        // storage.removeItem('persist:root')

        // storage.removeItem('persist:otherKey')
        // state.projects = {}        

    }
    return appReducer(state, action);
};

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;