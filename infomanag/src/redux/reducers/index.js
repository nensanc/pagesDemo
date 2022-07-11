
import { combineReducers } from 'redux';

import Auth from './auth';
import Alert from './alert';
import Listas from './listas';

export default combineReducers({
    Auth,
    Alert,
    Listas,
})