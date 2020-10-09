import { combineReducers } from 'redux';

import pdfReducer from './pdfReducer';
import editorReducer from './editorReducer';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import filesReducer from './filesReducer';

const rootReducer = combineReducers({
    editor: editorReducer,
    pdf: pdfReducer,
    auth: authReducer,
    projects: projectReducer,
    files: filesReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;