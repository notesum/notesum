import { combineReducers } from 'redux';
import countReducer from './countReducer';
import summaryReducer from './summaryReducer';

const rootReducer = combineReducers({
    counter: countReducer,
    summary: summaryReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;