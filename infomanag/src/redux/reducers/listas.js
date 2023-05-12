import {
    VIEW_NEW_PROCESS,
    CREATE_PROCESS_FAIL,
    CREATE_PROCESS_SUCCESS
} from '../actions/types';

const initialState = {
    bool_new_process: false,
    process: null
};

export default function Listas(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case VIEW_NEW_PROCESS:
            return{
                ...state,
                bool_new_process: payload
            }
        case CREATE_PROCESS_SUCCESS:
            return {
                ...state,
                process: payload
            }
        default:
            return state
    };
}