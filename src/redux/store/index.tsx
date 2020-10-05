import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

const config = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel1,
};

const persisted = persistReducer(config, rootReducer);
const middleWareEnhancer = applyMiddleware(thunkMiddleware);
const composedEnhancers = composeWithDevTools(middleWareEnhancer);

export default () => {
    const store = createStore(persisted,composedEnhancers);
    const persistor = persistStore(store);
    return{store,persistor};
};