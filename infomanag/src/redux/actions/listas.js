import {
    VIEW_NEW_PROCESS
} from './types'


export const view_new_process = (value) => dispatch => {
    dispatch({
        type: VIEW_NEW_PROCESS,
        payload:value
    });
}