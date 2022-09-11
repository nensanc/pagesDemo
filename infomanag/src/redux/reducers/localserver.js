import {
    VIEW_LOCALSERVER,
    LOCAL_SERVER_SUCCESS,
    LOCAL_SERVER_FAIL,
    LOCAL_SERVER_OFF,
    LOCAL_PF_SUCCESS,
    LOCAL_PF_FAIL
} from '../actions/types';

const initialState = {
    localserver_show: false,
    state_server: false,
    code: null,
    state_pf: false
};

export default function localserver(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case VIEW_LOCALSERVER:
            return{
                ...state,
                localserver_show: payload
            }
        case LOCAL_SERVER_SUCCESS:
            return{
                ...state,
                code: payload,
                state_server: true,
                localserver_show: false,
            }
        case LOCAL_PF_SUCCESS:
            return{
                ...state,
                state_pf: true
            }
        case LOCAL_PF_FAIL:
            return{
                ...state,
                state_pf: false
            }
        case LOCAL_SERVER_FAIL:
        case LOCAL_SERVER_OFF:
            return{
                ...state,
                code: null,
                state_server: false
            }
        default:
            return state
    };
}