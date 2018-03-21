import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware}  from 'redux';
import ReduxPromise from 'redux-promise';
import App from './App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

window.store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>, 
document.getElementById('root'));
registerServiceWorker();
