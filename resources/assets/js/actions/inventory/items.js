import {
    sdk
} from '../../Networking';

export const ITEM_ACTION = {
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
    UPLOAD_ITEM_IMAGE: {
        PENDING: 'upload_item_image_pending',
        SUCCESS: 'upload_item_image_success',
        ERROR: 'upload_item_image_error',
    },
    EDIT_ITEM: {
        PENDING: 'edit_item_pending',
        SUCCESS: 'edit_item_success',
        ERROR: 'edit_item_error',
    },
    SOLD_ITEM: {
        PENDING: 'sold_item_pending',
        SUCCESS: 'sold_item_success',
        ERROR: 'sold_item_error',
    },
    CREATE_ITEM: {
        PENDING: 'create_item_pending',
        SUCCESS: 'create_item_success',
        ERROR: 'create_item_error',
    },
    DELETE_ITEM: {
        PENDING: 'delete_item_pending',
        SUCCESS: 'delete_item_success',
        ERROR: 'delete_item_error',
    }
};

export function getItems(search = '', offset = 0) {
    return dispatch => {
        dispatch({
            type: offset ? ITEM_ACTION.GET_MORE_LIST.PENDING : ITEM_ACTION.GET_LIST.PENDING
        });

        let headers = {};

        return sdk.resources.inventory.items.list(search, offset)
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

export function uploadImage(file, key) {
    return dispatch => {
        dispatch({
            type: ITEM_ACTION.UPLOAD_ITEM_IMAGE.PENDING
        });

        return sdk.resources.inventory.items.uploadImage(file)
            .then(response => response.json())
            .then(json => dispatch({
                type: ITEM_ACTION.UPLOAD_ITEM_IMAGE.SUCCESS,
                key,
                response: json
            }))
    };
}

export function soldItem(values) {
    return dispatch => {
        dispatch({
            type: ITEM_ACTION.SOLD_ITEM.PENDING
        });

        let headers = {};
        return sdk.resources.inventory.items.sold(values.id, values)
            .then(response => {
                headers = response.headers;

                return response.json();
            })
            .then(json => dispatch({
                type: ITEM_ACTION.SOLD_ITEM.SUCCESS,
                response: json,
                headers: headers
            }))
            .catch(error => dispatch({
                type: ITEM_ACTION.SOLD_ITEM.ERROR,
                error
            }))
    };
}

function edit(id, values) {
    return dispatch => {
        dispatch({
            type: ITEM_ACTION.EDIT_ITEM.PENDING
        });

        return sdk.resources.inventory.items.edit(id, values)
            .then(response => response.json())
            .then(json => dispatch({
                type: ITEM_ACTION.EDIT_ITEM.SUCCESS,
                response: json
            }))
            .catch(error => dispatch({
                type: ITEM_ACTION.EDIT_ITEM.ERROR,
                error
            }))
    };
}

function create(values) {
    return dispatch => {
        dispatch({
            type: ITEM_ACTION.CREATE_ITEM.PENDING
        });

        let headers = {};

        return sdk.resources.inventory.items.create(values)
            .then(response => {
                headers = response.headers;

                return response.json();
            })
            .then(json => dispatch({
                type: ITEM_ACTION.CREATE_ITEM.SUCCESS,
                response: json,
                headers: headers
            }))
            .catch(error => dispatch({
                type: ITEM_ACTION.CREATE_ITEM.ERROR,
                error
            }))
    };
}

export function saveItem(values) {
    if (!!values.id) {
        return edit(values.id, values);
    }
    return create(values);

}

export function deleteItem(values) {
    return dispatch => {
        dispatch({
            type: ITEM_ACTION.DELETE_ITEM.PENDING
        });
        let headers = {};

        return sdk.resources.inventory.items.deleteItem(values)
            .then(response => {
                headers = response.headers;

                return response.json();
            })
            .then(json => dispatch({
                type: ITEM_ACTION.DELETE_ITEM.SUCCESS,
                response: json,
                headers: headers
            }))
            .catch(error => dispatch({
                type: ITEM_ACTION.DELETE_ITEM.ERROR,
                error
            }));
    }
}