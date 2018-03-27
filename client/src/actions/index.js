import axios from 'axios';
import {
    FETCH_DATA,
    ADD_TO_CART,
    LOGIN_USER,
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    TOOGLE_SIDEBAR,
    ADD_NEW_PRODUCT
} from './types';
import Axios from 'axios';

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

export function addNewProduct({product}){
    console.log({product});
    const { nombre, urlImagen, descripcion, stock, precio } = product;
    console.log(stock);
    const request = axios.post(`${ROOT_URL}/saveProduct`, product, {
        headers: {authorization: localStorage.getItem('token')}
    });
    return{
        type: ADD_NEW_PRODUCT,
        payload: request
    }
}
