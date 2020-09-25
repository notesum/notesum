import { combineReducers } from 'redux';
import countReducer from './countReducer';
import nameReducer from './nameReducer';
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    count: countReducer,
    name: nameReducer,
})

export const rootConfig = {
    key: 'root',
    storage: storage,
}

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;