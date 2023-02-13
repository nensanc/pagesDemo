import {
    VIEW_LOCALSERVER,
    LOCAL_SERVER_SUCCESS,
    LOCAL_SERVER_FAIL,
    LOCAL_SERVER_OFF,
    LOCAL_PF_SUCCESS,
    LOCAL_PF_FAIL,
    VIEW_PROJECT,
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_FAIL,
    SELECT_PRJ
} from '../actions/types';

const initialState = {
    localserver_show: false,
    state_server: false,
    code: null,
    state_pf: false,
    prj_show:false,
    list_prj: [],
    prj_name: null
};

export default function localserver(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case VIEW_LOCALSERVER:
            return{
                ...state,
                localserver_show: payload
            }
        case VIEW_PROJECT:
            return{
                ...state,
                prj_show: payload,
                list_prj: []
            }
        case SELECT_PRJ:
            return{
                ...state,
                prj_name: payload,
                prj_show: false
            }
        case GET_PROJECTS_SUCCESS:
            return{
                ...state,
                list_prj: payload.data
            }
        case GET_PROJECTS_FAIL:
            return{
                ...state,
                list_prj: []
            }
        case LOCAL_SERVER_SUCCESS:
            return{
                ...state,
                code: payload,
                state_server: true,
            }
        case LOCAL_PF_SUCCESS:
            return{
                ...state,
                state_pf: true,
                localserver_show: false,
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
                state_server: false,
                state_pf: false,
                prj_name: null,
                list_prj: []
            }
        default:
            return state
    };
}