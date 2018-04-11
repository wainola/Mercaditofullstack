import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware}  from 'redux';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import App from './App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
//import 'bootstrap/dist/css/bootstrapNOW.min.css';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, reduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

// IF TOKEN EXISTS, THEN DISPATCH AUTH_USER
if(token){
    store.dispatch({type: AUTH_USER});
}

window.store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
document.getElementById('root'));
registerServiceWorker();
