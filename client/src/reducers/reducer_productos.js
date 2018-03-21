import {FETCH_DATA} from '../actions/index';

export default function(state=[], action){
    //console.log(action.payload);
    switch(action.type){
        case FETCH_DATA:
            return [action.payload.data, ...state];
    }
    return state;
}