import {
    ITEM_ACTION
} from '../../../actions/inventory/items';

import {
    ETSY_ACTION
} from '../../../actions/inventory/etsy';

import {
    RACHAELS_ACTION
} from '../../../actions/inventory/rachaels';

const metaItemsState = {
    loading: false,
    total_items: 0,
    next_offset: 0,
    loading_item_image_upload: false,
    loading_etsy_search: false,
    loading_etsy_form: false,
    loading_rachaels_form: false,
};

export default function metaItems(state = metaItemsState, action) {
    switch (action.type) {
        case ITEM_ACTION.UPLOAD_ITEM_IMAGE.PENDING:
            console.log('meta item image upload pending');
            console.log(action);
            return Object.assign({}, state, {
                loading_item_image_upload: true
            });
        case ITEM_ACTION.UPLOAD_ITEM_IMAGE.SUCCESS:
            console.log('meta item image upload pending');
            console.log(action);
            return Object.assign({}, state, {
                loading_item_image_upload: false
            });
        case ITEM_ACTION.GET_LIST.PENDING:
        case ITEM_ACTION.EDIT_ITEM.PENDING:
        case ITEM_ACTION.CREATE_ITEM.PENDING:
        case ITEM_ACTION.DELETE_ITEM.PENDING:
        case ITEM_ACTION.SOLD_ITEM.PENDING:
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
        case ITEM_ACTION.CREATE_ITEM.SUCCESS:
        case ITEM_ACTION.DELETE_ITEM.SUCCESS:
        case ITEM_ACTION.SOLD_ITEM.SUCCESS:
            console.log('meta create success');
            console.log(action);
            return Object.assign({}, state, {
                loading: false,
                total_items: Number(action.headers.get('X-ITEMS-TOTAL'))
            });
        case ITEM_ACTION.EDIT_ITEM.SUCCESS:
            console.log('meta edit success');
            console.log(action);
            return Object.assign({}, state, {
                loading: false,
            });
        case ITEM_ACTION.CREATE_ITEM.ERROR:
        case ITEM_ACTION.EDIT_ITEM.ERROR:
            return Object.assign({}, state, {
                loading: false,
            });
        case ETSY_ACTION.SEARCH_ITEM.PENDING:
            return Object.assign({}, state, {
                loading_etsy_search: {
                    [action.key]: true
                }
            });
        case ETSY_ACTION.SEARCH_ITEM.SUCCESS:
            if (typeof state['loading_etsy_search'][action.key] !== 'undefined') {
                return Object.assign({}, state, {
                    loading_etsy_search: false
                });
            }
        case ETSY_ACTION.GET_ITEM.PENDING:
            return Object.assign({}, state, {
                loading_etsy_form: true
            });
        case ETSY_ACTION.GET_ITEM.SUCCESS:
            return Object.assign({}, state, {
                loading_etsy_form: false
            });
        case ETSY_ACTION.GET_ITEM.ERROR:
            return Object.assign({}, state, {
                loading_etsy_form: false
            });
        default:
            return state;
    }
    return state;
}