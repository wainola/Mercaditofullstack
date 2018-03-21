import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';
export const ADD_TO_CART = 'ADD_TO_CART';
export const LOGIN_USER = 'LOGIN_USER';

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

export function loginUser(values){
    const request = {};
    return{
        type: LOGIN_USER,
        payload: request
    }
}