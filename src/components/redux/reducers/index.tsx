import { combineReducers } from 'redux';
import countReducer from './countReducer';
import pdfReducer from './pdfReducer';
import summaryReducer from './summaryReducer';

const rootReducer = combineReducers({
    counter: countReducer,
    summary: summaryReducer,
    pdf: pdfReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;