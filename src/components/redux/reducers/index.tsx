import { combineReducers } from 'redux';
import countReducer from './countReducer';
import nameReducer from './nameReducer';
import summaryReducer from './summaryReducer';

const rootReducer = combineReducers({
    counter: countReducer,
    name: nameReducer,
    summary: summaryReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;