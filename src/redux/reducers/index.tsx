import { combineReducers } from 'redux';

import pdfReducer from './pdfReducer';
import editorReducer from './editorReducer';
import projectsReducer from './projectsReducer';
import filesReducer from './filesReducer';

const rootReducer = combineReducers({
    editor: editorReducer,
    pdf: pdfReducer,
    projects: projectsReducer,
    files: filesReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;