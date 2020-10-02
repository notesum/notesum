import { combineReducers } from 'redux';
import pdfReducer from './pdfReducer';
import summaryReducer from './summaryReducer';

const rootReducer = combineReducers({
    summary: summaryReducer,
    pdf: pdfReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;