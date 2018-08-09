import { combineReducers } from 'redux'
import items from './items';
import metaItems from './metaItems';

export default combineReducers({
    items,
    metaItems
})