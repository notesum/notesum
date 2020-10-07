import { combineReducers } from 'redux';

import pdfReducer from './pdfReducer';
import editorReducer from './editorReducer';
import projectsReducer from './projectsReducer';

const rootReducer = combineReducers({
    editor: editorReducer,
    pdf: pdfReducer,
    projects: projectsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;