import {
    sdk
} from '../../Networking';

export const ITEM_ACTION = {
    GET_ITEM: {
        PENDING: 'item_pending',
        SUCCESS: 'item_success',
        ERROR: 'item_error',
    },
    GET_LIST: {
        PENDING: 'item_list_pending',
        SUCCESS: 'item_list_success',
        ERROR: 'item_list_error',
    },
    GET_MORE_LIST: {
        PENDING: 'more_item_list_pending',
        SUCCESS: 'more_item_list_success',
        ERROR: 'more_item_list_error',
    },
};

export function getItems(search = '', offset = 0, orderBy = 'name', orderType = 'asc') {
    return dispatch => {
        dispatch({
            type: offset ? ITEM_ACTION.GET_MORE_LIST.PENDING : ITEM_ACTION.GET_LIST.PENDING
        });

        let headers = {};

        return sdk.resources.shop.items.list(search, offset, orderBy, orderType)
            .then(response => {
                headers = response.headers;

                return response.json();
            })
            .then(json => (
                dispatch({
                    type: offset ? ITEM_ACTION.GET_MORE_LIST.SUCCESS : ITEM_ACTION.GET_LIST.SUCCESS,
                    response: json,
                    headers: headers
                })
            ));
    };
}

export function getItem(id) {
    return dispatch => {
        dispatch({
            type: ITEM_ACTION.GET_ITEM.PENDING
        });

        let headers = {};

        return sdk.resources.shop.items.item(id)
            .then(response => {
                headers = response.headers;

                return response.json();
            })
            .then(json => (
                dispatch({
                    type: ITEM_ACTION.GET_ITEM.SUCCESS,
                    response: json,
                    headers: headers
                })
            ));
    };
}