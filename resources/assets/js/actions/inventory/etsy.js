import {
    sdk
} from '../../Networking';

export const ETSY_ACTION = {
    SEARCH_ITEM: {
        PENDING: 'search_item_pending',
        SUCCESS: 'search_item_success',
        ERROR: 'search_item_error',
    },
    GET_ITEM: {
        PENDING: 'get_item_pending',
        SUCCESS: 'get_item_success',
        ERROR: 'get_item_error',
    },
};

export function searchEtsyItem(value) {
    return dispatch => {
        dispatch({
            type: ETSY_ACTION.SEARCH_ITEM.PENDING,
            key: value
        });

        return sdk.resources.inventory.etsy.searchItem(value)
            .then(response => {
                return response.json();
            })
            .then(json => dispatch({
                type: ETSY_ACTION.SEARCH_ITEM.SUCCESS,
                key: value,
                response: json
            }));
    }
}

export function getEtsyItem(id) {
    return dispatch => {
        dispatch({
            type: ETSY_ACTION.GET_ITEM.PENDING,
        });

        if (!id) {
            return dispatch({
                type: ETSY_ACTION.GET_ITEM.ERROR,
            });
        }

        return sdk.resources.inventory.etsy.getItem(id)
            .then(response => {
                return response.json();
            })
            .then(json => dispatch({
                type: ETSY_ACTION.GET_ITEM.SUCCESS,
                key: id,
                response: json
            }));
    }
}