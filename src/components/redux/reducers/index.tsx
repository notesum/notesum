import { combineReducers } from 'redux';
import countReducer from './countReducer';
import nameReducer from './nameReducer';
import storage from "redux-persist/lib/storage";
import summaryReducer from './summaryReducer';

const rootReducer = combineReducers({
    counter: countReducer,
    name: nameReducer,
    summary: summaryReducer,
})

// const rootReducer = testReducer;

export const rootConfig = {
    key: 'root',
    storage: storage,
}

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;