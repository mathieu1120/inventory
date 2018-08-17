import {
    sdk
} from '../../Networking';

export const RACHAELS_ACTION = {
    GET_PRODUCT: {
        PENDING: 'get_product_pending',
        SUCCESS: 'get_product_success',
        ERROR: 'get_product_error',
    },
    SAVE_PRODUCT: {
        PENDING: 'save_product_pending',
        SUCCESS: 'save_product_success',
        ERROR: 'save_product_error',
    },
    GET_CATEGORIES: {
        PENDING: 'get_categories_pending',
        SUCCESS: 'get_catgories_success',
        ERROR: 'get_categories_error',
    },
    ADD_CATEGORY: {
        PENDING: 'add_category_pending',
        SUCCESS: 'add_category_success',
        ERROR: 'add_category_error',
    }
};

export function getProduct(id) {
    return dispatch => {
        dispatch({
            type: RACHAELS_ACTION.GET_PRODUCT.PENDING,
        });

        return sdk.resources.inventory.rachaels.getProduct(id)
            .then(response => {
                return response.json();
            })
            .then(json => dispatch({
                type: RACHAELS_ACTION.GET_PRODUCT.SUCCESS,
                key: id,
                response: json
            }));
    }
}

export function saveItem(values) {
    return dispatch => {
        dispatch({
            type: RACHAELS_ACTION.SAVE_PRODUCT.PENDING,
        });

        if (!!values.id) {
            return sdk.resources.inventory.rachaels.edit(values.id, values)
                .then(response => {
                    return response.json();
                })
                .then(json => dispatch({
                    type: RACHAELS_ACTION.SAVE_PRODUCT.SUCCESS,
                    item_id: values.item_id,
                    response: json
                }));
        }
        return sdk.resources.inventory.rachaels.create(values)
            .then(response => {
                return response.json();
            })
            .then(json => dispatch({
                type: RACHAELS_ACTION.SAVE_PRODUCT.SUCCESS,
                item_id: values.item_id,
                response: json
            }));
    }
}

export function getCategories(parentId = 0) {
    return dispatch => {
        dispatch({
            type: RACHAELS_ACTION.GET_CATEGORIES.PENDING,
        });

        return sdk.resources.inventory.rachaels.getCategories(parentId)
            .then(response => {
                return response.json();
            })
            .then(json => dispatch({
                type: RACHAELS_ACTION.GET_CATEGORIES.SUCCESS,
                response: json,
                parentId
            }));
    }
}

export function addCategory(parentId, value) {
    return dispatch => {
        dispatch({
            type: RACHAELS_ACTION.ADD_CATEGORY.PENDING,
        });

        return sdk.resources.inventory.rachaels.addCategory(parentId, value)
            .then(response => {
                return response.json();
            })
            .then(json => dispatch({
                type: RACHAELS_ACTION.ADD_CATEGORY.SUCCESS,
                parentId,
                response: json
            }));
    }
}