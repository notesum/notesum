import { createStore } from 'redux';
import rootReducer, { rootConfig } from '../reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';


const persisted = persistReducer(rootConfig, rootReducer);

const store = createStore(rootReducer, devToolsEnhancer({}));

export default store;