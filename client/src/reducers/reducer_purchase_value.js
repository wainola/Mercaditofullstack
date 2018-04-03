import { GET_PURCHASE_VALUE, SUBTRACT_FROM_CART } from '../actions/types';
import _ from 'lodash';

export default function(state=[], action){
    switch(action.type){
        case GET_PURCHASE_VALUE:
            console.log('get purchased value');
            console.log('el estado actual es', state);
            console.log('el valor a modificar es', action.payload);
            if((action.payload.precio * action.payload.cantidad) < state[0]){
                console.log('el valor recibido es menor a lo que esta en el estado, por lo que hubo un cambio en la seleccion');
                let changeInState = [...state];
                changeInState = [(action.payload.precio * action.payload.cantidad)];
                return changeInState;
            }
            // console.log('reducer purchased value');
            // console.log(action)

            //COMPUTING THE ACTUAL VALUE OF THE PURCHASE ITEM IN THE CART
            let cartValue = action.payload.precio * action.payload.cantidad;
            if(state.length > 0){
                //console.log('hay mas de un item en el estado');
                // MAKING INMUTABLE COPY OF THE STATE
                let newState = [...state];
                let valuePurchase = _.reduce(newState, (accu, item) => accu + item + cartValue, 0);
                //console.log(valuePurchase);
                let purchaseState = [valuePurchase];
                return purchaseState;
            }
            return [...state, cartValue];
        case SUBTRACT_FROM_CART:
            // console.log('subtract from cart');
            // console.log(action.payload);
            // console.log('estado actual', state);
            let newPurchaseState = [...state];
            // console.log('el nuevo estado antes de actualizcion', newPurchaseState);
            newPurchaseState = [_.reduce(newPurchaseState, (accu, item) => accu + item - action.payload, 0)];
            // console.log('nuevo estado es', newPurchaseState);
            return newPurchaseState;
    }
    return state;
}

