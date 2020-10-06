import { combineReducers } from 'redux';

import pdfReducer from './pdfReducer';
import editorReducer from './editorReducer';

const rootReducer = combineReducers({
    editor: editorReducer,
    pdf: pdfReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;