import {combineReducers} from 'redux';
import ProductosReducer from './reducer_productos';
import CarroDeCompras from './reducer_carro_compra';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    productos: ProductosReducer,
    carroCompra: CarroDeCompras,
    form: formReducer
});

export default rootReducer;