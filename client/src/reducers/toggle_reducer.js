import { TOOGLE_SIDEBAR } from '../actions/types';

export default function(state={ toggle: true }, action){
    switch (action.type) {
        case TOOGLE_SIDEBAR:
            return { ...state, toggle: action.payload };
    }
    return state;
}