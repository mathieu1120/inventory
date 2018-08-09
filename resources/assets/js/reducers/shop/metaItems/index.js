import {
    ITEM_ACTION
} from '../../../actions/inventory/items';

const metaItemsState = {
    loading: false,
    total_items: 0,
    next_offset: 0,
};

export default function metaItems(state = metaItemsState, action) {
    switch (action.type) {
        case ITEM_ACTION.GET_LIST.PENDING:
            console.log('meta list pending');
            console.log(action);
            return Object.assign({}, state, {
                loading: true
            });
        case ITEM_ACTION.GET_LIST.SUCCESS:
        case ITEM_ACTION.GET_MORE_LIST.SUCCESS:
            console.log('meta list success');
            console.log(action);
            return Object.assign({}, state, {
                loading: false,
                total_items: Number(action.headers.get('X-ITEMS-TOTAL')),
                next_offset: Number(action.headers.get('X-ITEMS-NEXT-OFFSET')),
            });
        default:
            return state;
    }
    return state;
}