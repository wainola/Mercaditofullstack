import { GET_PURCHASE_VALUE } from '../actions/types';

export default function(state=[], action){
    switch(action.type){
        case GET_PURCHASE_VALUE:
            return state;
    }
    return state;
}

