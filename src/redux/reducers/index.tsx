import { combineReducers } from 'redux';
import userReducer from '../User/reducer';
import pdfReducer from './pdfReducer';
import editorReducer from './editorReducer';
import {loginReducer} from './../login/reducer';

const rootReducer = combineReducers({
    editor: editorReducer,
    pdf: pdfReducer,
    user: userReducer,
    loginReducer: loginReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;