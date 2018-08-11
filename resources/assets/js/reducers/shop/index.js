import { combineReducers } from 'redux'
import items from './items';
import item from './item';
import metaItems from './metaItems';

export default combineReducers({
    items,
    item,
    metaItems
})