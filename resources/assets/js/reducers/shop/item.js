import {
    ITEM_ACTION
} from '../../actions/shop/items';

const itemState = {

};

export default function item(state = itemState, action) {
    switch (action.type) {
        case ITEM_ACTION.GET_ITEM.SUCCESS:
            console.log('get list');
            console.log(action);
            return action.response;
        default:
            return state;
    }
    return state;
}