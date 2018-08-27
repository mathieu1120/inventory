import {
    sdk
} from '../../Networking';
import {RACHAELS_ACTION} from "../inventory/rachaels";

export const CART_ACTION = {
    GET_ITEMS: {
        PENDING: 'get_cart_items_pending',
        SUCCESS: 'get_cart_items_success',
        ERROR: 'get_cart_items_error',
    },
    ADD_ITEM: {
        PENDING: 'add_cart_item_pending',
        SUCCESS: 'add_cart_item_success',
        ERROR: 'add_cart_item_error',
    },
    SAVE_DESTINATION: {
        PENDING: 'save_destination_pending',
        SUCCESS: 'save_destination_success',
        ERROR: 'save_destination_error',
    }
};

export function getItems() {
    return dispatch => {
        dispatch({
            type: CART_ACTION.GET_ITEMS.PENDING
        });

        return sdk.resources.shop.cart.getItems()
            .then(response => {
                return response.json();
            })
            .then(json => (
                dispatch({
                    type: CART_ACTION.GET_ITEMS.SUCCESS,
                    response: json,
                })
            )).catch(error => {
                dispatch({
                    type: CART_ACTION.GET_ITEMS.ERROR,
                    response: error,
                })
            });
    };
}

export function addItem(id) {
    return dispatch => {
        dispatch({
            type: CART_ACTION.ADD_ITEM.PENDING
        });

        return sdk.resources.shop.cart.addItem(id)
            .then(response => {
                return response.json();
            })
            .then(json => (
                dispatch({
                    type: CART_ACTION.ADD_ITEM.SUCCESS,
                    response: json,
                })
            )).catch(error => {
                dispatch({
                    type: CART_ACTION.ADD_ITEM.ERROR,
                    response: error,
                })
            });
    };
}

export function saveDestinationToCart(destination) {
    return dispatch => {
        dispatch({
            type: CART_ACTION.SAVE_DESTINATION.PENDING,
        });

        return sdk.resources.shop.cart.saveDestination(destination)
            .then(response => {
                return response.json();
            })
            .then(json => dispatch({
                type: CART_ACTION.SAVE_DESTINATION.SUCCESS,
                response: json
            })).catch(error => {
                dispatch({
                    type: CART_ACTION.SAVE_DESTINATION.ERROR,
                    response: error,
                });
                throw error;
            });
    }
}