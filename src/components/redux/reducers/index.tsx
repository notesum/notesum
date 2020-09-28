import { combineReducers } from 'redux';
import countReducer from './countReducer';
import nameReducer from './nameReducer';
import storage from "redux-persist/lib/storage";
import summaryReducer from './summaryReducer';
import testReducer from './testReducer';

// const rootReducer = combineReducers({
//     count: countReducer,
//     name: nameReducer,
//     summary: summaryReducer,
//     test: testReducer,
// })

const rootReducer = testReducer;

export const rootConfig = {
    key: 'root',
    storage: storage,
}

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;