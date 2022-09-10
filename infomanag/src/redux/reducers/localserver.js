import {
    VIEW_LOCALSERVER
} from '../actions/types';

const initialState = {
    localserver_show: false,
    code: null,
    
};

export default function localserver(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case VIEW_LOCALSERVER:
            return{
                ...state,
                localserver_show: payload
            }
        default:
            return state
    };
}