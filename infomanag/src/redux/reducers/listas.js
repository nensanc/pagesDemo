import {
    VIEW_NEW_PROCESS
} from '../actions/types';

const initialState = {
    bool_new_process: false,
};

export default function Listas(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case VIEW_NEW_PROCESS:
            return{
                ...state,
                bool_new_process: payload
            }
        default:
            return state
    };
}