import { SEND_ORDER } from '../actions/types';

export default function(state=[], action){
    switch(action.type){
        case SEND_ORDER:
            return {...state, data: action.payload};
    }
    return state;
}