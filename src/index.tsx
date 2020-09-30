import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import store from './components/redux/store';
// import { persistor } from './components/redux/store';
import Store from './components/redux/store';
// import {store, persistor } from './components/redux/store';

import './index.css';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';


// ReactDOM.render(
//     <Provider store={store}>
//             <Root />
//     </Provider>
//     , document.getElementById('root'));

const {store,persistor} = Store();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
            <Root />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// TODO
serviceWorker.unregister();
