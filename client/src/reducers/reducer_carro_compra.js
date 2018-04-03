import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types';
import _ from 'lodash';

export default function(state=[], action){
    //console.log("Reducer cart", action.payload);
    switch(action.type){
        case ADD_TO_CART:
            // console.log('reducer add_to_cart case');
            // console.log('state');
            // console.log(state);
            // console.log(action.payload);
            console.log(_.some(state, ['id', action.payload.id]));
            // IF THE ID ALREADY EXISTS, REPLACE FOR THE LAST PRODUCT
            if(_.some(state, ['id', action.payload.id])){
                let match = _.find(state, {id: action.payload.id});
                let index = _.findIndex(state, {id: action.payload.id});
                console.log('el indice en donde esta el elemento', index);
                console.log('esta actualmente en el state', match);
                console.log('queremos cambiarlo por', action.payload);
                console.log('cambio:', _.merge(match, action.payload));
                // TAKING INTO ACCOUNT INMUTABILITY
                const newState = [...state];
                console.log('cambiando el state', newState.splice(index, _.merge(match, action.payload)));
                console.log('el nuevo estado es', state);
                // let newState = _.merge(match, state);
                // console.log('new match');
                // console.log(newState);
                
                return [...newState];
            }
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