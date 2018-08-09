import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import shop from './shop/index';

export default combineReducers({
    form: formReducer,
    shop
})