import { combineReducers } from 'redux'
import items from './items';
import metaItems from './metaItems';
import uploads from './uploads';
import formErrors from './formErrors';
import etsySearch from './etsySearch';

export default combineReducers({
    items,
    metaItems,
    uploads,
    formErrors,
    etsySearch
})
