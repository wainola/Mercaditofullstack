import axios from 'axios';
import {
    FETCH_DATA,
    ADD_TO_CART,
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    ADD_NEW_PRODUCT,
    FETCH_PRODUCTS,
    REMOVE_FROM_CART,
    GET_PURCHASE_VALUE
} from './types';

const ROOT_URL = 'http://localhost:4500';

export function fetchProductos(){
    const url = `http://localhost:4500/frontAllProducts`;
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

export function removeFromCart(key){
    // console.log('remove cart action');
    // console.log(key);
    return{
        type: REMOVE_FROM_CART,
        payload: key
    }
}

export function purchaseValue(value){
    return{
        type: GET_PURCHASE_VALUE,
        payload: value
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
                localStorage.setItem('mail_user', email);
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
    localStorage.removeItem('mail_user');
    return{
        type: UNAUTH_USER
    }
}

export function addNewProduct({data}){
    return function(dispatch){
        console.log(data);  
    }
}

export function fetchProducts(){
    return function(dispatch){
        axios.get(`${ROOT_URL}/getAllProducts`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then(response => {
                dispatch({type: FETCH_PRODUCTS, payload: response});
        });
    }
}