import {
    ITEM_ACTION
} from '../../actions/shop/items';

const itemsState = [

];

export default function items(state = itemsState, action) {
    switch (action.type) {
        case ITEM_ACTION.GET_LIST.SUCCESS:
            console.log('get list');
            console.log(action);
            return action.response;
        case ITEM_ACTION.GET_MORE_LIST.SUCCESS:
            console.log('get more list');
            console.log(action);
            return state.concat(action.response);
        default:
            return state;
    }
    return state;
}