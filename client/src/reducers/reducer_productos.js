import { FETCH_DATA, ADD_NEW_PRODUCT } from '../actions/types';

export default function(state=[], action){
    //console.log(action.payload);
    switch(action.type){
        case FETCH_DATA:
            return [action.payload.data, ...state];
        case ADD_NEW_PRODUCT:
            return [ ...state, action.payload.data ]
    }
    return state;
}