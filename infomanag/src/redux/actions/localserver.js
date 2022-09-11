import {
    VIEW_LOCALSERVER,
    SET_AUTH_LOADING,
    LOCAL_SERVER_SUCCESS,
    LOCAL_SERVER_FAIL,
    REMOVE_AUTH_LOADING,
    LOCAL_SERVER_OFF,
    LOCAL_PF_SUCCESS,
    LOCAL_PF_FAIL
} from './types'
import { setAlert } from './alert';
import axios from 'axios'


export const set_view_localserver = (value) => dispatch => {
    dispatch({
        type: VIEW_LOCALSERVER,
        payload:value
    });
}

export const localserver_off = () => dispatch => {
    dispatch({
        type: LOCAL_SERVER_OFF,
    });
}

export const connection = (code) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'origin':'x-requested-with',
            'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({
        "code":code,
        "msg":process.env.REACT_APP_API_URL
    });

    try {
        const res = await axios.post(
            `${process.env.REACT_APP_LOCAL_SERVER_URL}/connection`,
            body, config);
        if (res.data.res === 'conection success') {
            dispatch({
                type: LOCAL_SERVER_SUCCESS,
                payload: code
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert(true, 'Conexión exitosa con el servidro local', '#8bf282'));
        } else {
            dispatch({
                type: LOCAL_SERVER_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert(true, 'Error al conectar con el servidor', '#fcbfbf'));
        }
    }
    catch(err){
        dispatch({
            type: LOCAL_SERVER_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true, 'Error al conectar con el servidor. Intenta de nuevo', '#fcbfbf'));
    }
}

export const send_data = (code, msg, action, data) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'origin':'x-requested-with',
            'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({
        "code":code,
        "msg":msg,
        "action":action,
        "data":data
    });

    try {
        const res = await axios.post(
            `${process.env.REACT_APP_LOCAL_SERVER_URL}/data`,
            body, config);
        if (res.status === 200) {
            switch (res.data.key){
                case "connpf":
                    dispatch({
                        type: LOCAL_PF_SUCCESS,
                        payload: res.data.res
                    });
                    break
                default:
                    dispatch({});
            }            
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert(true, res.data.msg, '#8bf282'));
        } else {
            switch (res.data.key){
                case "connpf":
                    dispatch({
                        type: LOCAL_PF_FAIL,
                    });
                    break
                default:
                    dispatch({});
            }
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert(true, 'Error al conectar con PF', '#fcbfbf'));
        }
    }
    catch(err){
        dispatch({
            type: LOCAL_PF_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true, 'Error al conectar con PF. Intenta de nuevo', '#fcbfbf'));
    }
}