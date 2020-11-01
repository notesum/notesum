import { combineReducers } from 'redux';

import authReducer from './authReducer';
import projectReducer from './projectReducer';
import filesReducer from './filesReducer';
import redirectReducer from './redirectReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    projects: projectReducer,
    files: filesReducer,
    redirect: redirectReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;