import { combineReducers } from 'redux';

import pdfReducer from './pdfReducer';
import editorReducer from './editorReducer';
import fileReducer from './fileReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    editor: editorReducer,
    pdf: pdfReducer,
    files: fileReducer,
    auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;