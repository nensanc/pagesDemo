import {
    VIEW_NEW_PROCESS,
    CREATE_PROCESS_SUCCESS,
    CREATE_PROCESS_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING
} from './types'
import { setAlert } from './alert';
import axios from 'axios'

export const view_new_process = (value) => dispatch => {
    dispatch({
        type: VIEW_NEW_PROCESS,
        payload:value
    });
}

export const create_process = (name, desc) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });
    console.log(localStorage.getItem('access'));

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    const body = JSON.stringify({
        name,
        desc,
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/listas/save-process/`, body, config);

        if (res.status === 201) {
            dispatch({
                type: CREATE_PROCESS_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert(true,res.msg,'#8bf282'))
            
        } else {
            dispatch(setAlert(true,res.msg, '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch (err) {
        dispatch({
            type: CREATE_PROCESS_FAIL,
            payload: false
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
};