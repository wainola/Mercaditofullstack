import { SEND_ORDER, ORDERS_OF_THE_WEEK } from '../actions/types';

export default function(state=[], action){
    console.log('reducer order action reducer');
    console.log(action.payload);
    switch(action.type){
        case SEND_ORDER:
            return {...state, data: action.payload.data_recibida, success: action.payload.success };
        case ORDERS_OF_THE_WEEK:
            return { ...state, ordenes: action.payload };
    }
    return state;
}