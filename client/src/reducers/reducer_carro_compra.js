import { ADD_TO_CART } from '../actions/types';

export default function(state=[], action){
    //console.log("Reducer cart", action.payload);
    switch(action.type){
        case ADD_TO_CART:
            return [action.payload, ...state];
    }
    return state;
}