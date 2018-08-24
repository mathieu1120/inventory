import { combineReducers } from 'redux'
import items from './items';
import item from './item';
import metaItems from './metaItems';
import cart from './cart';

export default combineReducers({
    items,
    item,
    metaItems,
    cart
})