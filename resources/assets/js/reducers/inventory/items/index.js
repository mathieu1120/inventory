import {
    ITEM_ACTION
} from '../../../actions/inventory/items';
import {RACHAELS_ACTION} from "../../../actions/inventory/rachaels";

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
        case ITEM_ACTION.EDIT_ITEM.SUCCESS:
            console.log('edit');
            console.log(action);
            return state.map((item) => {
                if (item.id == action.response.item.id) {
                    return action.response.item;
                }
                return item;
            });
        case ITEM_ACTION.CREATE_ITEM.SUCCESS:
            console.log('create');
            console.log(action);
            state[0] = action.response.item;
            return state;
        case ITEM_ACTION.DELETE_ITEM.SUCCESS:
            console.log('delete');
            console.log(action);
            return state.filter((item) => {
                return item.id !== Number(action.response.deletedItemId);
            });
        case ITEM_ACTION.SOLD_ITEM.SUCCESS:
            console.log('sold');
            console.log(action);
            return state.filter((item) => {
                return item.id !== Number(action.response.soldItemId);
            });
        case RACHAELS_ACTION.SAVE_PRODUCT.SUCCESS:
            console.log(action.response);
            return state.map((item) => {
                if (item.id === action.item_id) {
                    return {
                        ...item,
                        shop_product_id: action.response.product.id
                    };
                }
                return item;
            });
        default:
            return state;
    }
    return state;
}