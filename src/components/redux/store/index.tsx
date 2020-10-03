import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
// import immutableTransform from 'redux-persist-transform-immutable'

import rootReducer from '../reducers';

const config = {
    // transforms: [immutableTransform()],
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel1,
};

const persisted = persistReducer(config, rootReducer);

// const store = createStore(persisted, devToolsEnhancer({}));
// export const persistor = persistStore(store);

// const store = createStore(rootReducer,devToolsEnhancer({}));

// export default store;

export default () => {
    const store = createStore(persisted,devToolsEnhancer({}));
    const persistor = persistStore(store);
    return{store,persistor};
};