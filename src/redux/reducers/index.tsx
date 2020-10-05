import { combineReducers } from 'redux';
import userReducer from '../User/reducer';
import pdfReducer from './pdfReducer';
import summaryReducer from './summaryReducer';
import {loginReducer} from './../login/reducer';

const rootReducer = combineReducers({
    summary: summaryReducer,
    pdf: pdfReducer,
    user: userReducer,
    loginReducer: loginReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;