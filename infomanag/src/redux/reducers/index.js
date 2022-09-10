
import { combineReducers } from 'redux';

import Auth from './auth';
import Alert from './alert';
import Listas from './listas';
import Localserver from './localserver';

export default combineReducers({
    Auth,
    Alert,
    Listas,
    Localserver
})