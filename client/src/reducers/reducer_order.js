import { SEND_ORDER, ORDERS_OF_THE_WEEK } from '../actions/types';
import _ from 'lodash';

export default function(state=[], action){
    // console.log('reducer order action reducer');
    // console.log(action.payload);
    switch(action.type){
        case SEND_ORDER:
            return {...state, data: action.payload.data_recibida, success: action.payload.success };
        case ORDERS_OF_THE_WEEK:
            console.log(action.payload)
            // PROCESSING THE ARRAY AND GETING ONLY THE NAMES AND ID
            // NOTE THAT THE DATA THAT IS RETURNED BY THE API SEND DUPLICATES FOR NAMES, ID, ADDRESS AND EMAIL.
            // BUT NOT DUPLICATES FOR ITEMS AND PURCHASES AMOUNT
            // SO WE NEED TO PROCESS THIS DUPLICATES ITEMS BEFORE THE RENDER
            let a_names = _.uniqBy(action.payload.data, 'nombre').map(item => { 
                return { id: item.id_cliente, nombre: item.nombre, email: item.email, direccion: item.direccion }
            });
            let a_items = _.groupBy(action.payload.data, 'id_cliente');
            let compras = [];
            a_names.forEach(item => {
                item.compras = a_items[item.id].map(elemento => {
                    return { producto: elemento.producto_pedido, cantidad: elemento.cantidad, monto: elemento.monto }
                });
                item.monto_total = action.payload.montos.filter(elemento => elemento.cliente === item.nombre)[0].monto;
            });
            //console.log('a_names mofificado es, =>', a_names);
            return { ...state, ordenes: a_names };
    }
    return state;
}