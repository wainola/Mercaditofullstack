import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types';
import _ from 'lodash';

export default function(state=[], action){
    //console.log("Reducer cart", action.payload);
    switch(action.type){
        case ADD_TO_CART:
            console.log('reducer add_to_cart case');
            console.log('state');
            console.log(state);
            console.log(action.payload);
            return [action.payload, ...state];
        case REMOVE_FROM_CART:
            // console.log('reducer remove from cart');
            // console.log(action.payload);
            let removeProduct = item => item.id !== action.payload;
            let newState = _.filter(state, removeProduct);
            // console.log('new state');
            // console.log(newState);
            return [ ...newState ];
    }
    return state;
}