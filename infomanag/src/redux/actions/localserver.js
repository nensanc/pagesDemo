import {
    VIEW_LOCALSERVER
} from './types'
import { setAlert } from './alert';
import axios from 'axios'


export const set_view_localserver = (value) => dispatch => {
    dispatch({
        type: VIEW_LOCALSERVER,
        payload:value
    });
}