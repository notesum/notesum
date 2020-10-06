import { combineReducers } from 'redux';

import pdfReducer from './pdfReducer';
import editorReducer from './editorReducer';
import fileReducer from './fileReducer';

const rootReducer = combineReducers({
    editor: editorReducer,
    pdf: pdfReducer,
    files: fileReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;