import { GET_CATEGORIES } from '../actions/types';

export default function(state=[], action){
    switch(action.type){
        case GET_CATEGORIES:
        return { categorias_retornadas: action.payload.data }
    }
    return state;
}