import {combineReducers} from 'redux';
import ProductosReducer from './reducer_productos';
import CarroDeCompras from './reducer_carro_compra';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducer';
import toggleReducer from './toggle_reducer';

const rootReducer = combineReducers({
    productos: ProductosReducer,
    carroCompra: CarroDeCompras,
    form: formReducer,
    auth: authReducer,
    toggle: toggleReducer
});

export default rootReducer;