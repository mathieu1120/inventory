import {
    sdk
} from '../../Networking';

export const RACHAELS_ACTION = {
    GET_PRODUCT: {
        PENDING: 'get_product_pending',
        SUCCESS: 'get_product_success',
        ERROR: 'get_product_error',
    },
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