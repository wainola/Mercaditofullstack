import {combineReducers} from 'redux';
import ProductosReducer from './reducer_productos';
import CarroDeCompras from './reducer_carro_compra';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducer';
import ValorCompra from './reducer_purchase_value';
import OrderReducer from './reducer_order';

const rootReducer = combineReducers({
    productos: ProductosReducer,
    carroCompra: CarroDeCompras,
    form: formReducer,
    auth: authReducer,
    valorCompra: ValorCompra,
    order: OrderReducer
});

export default rootReducer;