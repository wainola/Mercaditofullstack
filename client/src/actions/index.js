import axios from 'axios';
import {
    FETCH_DATA,
    ADD_TO_CART,
    LOGIN_USER,
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER
} from './types';

const ROOT_URL = 'http://localhost:4500';

export function fetchProductos(){
    const url = `${window.location.origin}/data/data_productos.json`;
    const request = axios.get(url);
    return{
        type: FETCH_DATA,
        payload: request
    }
}

export function addToCart(producto){
    return{
        type: ADD_TO_CART,
        payload: producto
    }
}

export function signinUser({email, password}, callback){
    // USING REDUX THUNK TO RETURN A FUNCTION THAT DISPATCH
    return function(dispatch){
        axios.post(`${ROOT_URL}/signin`, {email, password})
        .then(
            response => {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                // THIS IS THE CALLBACK THAT MANAGES THE REDIRECTION
                callback();
            }
        )
        .catch(() => {
            dispatch(authError('El usuario no existe!'));
        });
    }
}

export function authError(error){
    return{
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser(){
    localStorage.removeItem('token');
    return{
        type: UNAUTH_USER
    }
}