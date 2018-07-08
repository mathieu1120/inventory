import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import inventory from './inventory';

export default combineReducers({
    form: formReducer,
    inventory
})
