import {
    CART_ACTION
} from '../../actions/shop/cart';

const cartState = {
    products: []
};

export default function cart(state = cartState, action) {
    switch (action.type) {
        case CART_ACTION.GET_ITEMS.SUCCESS:
        case CART_ACTION.ADD_ITEM.SUCCESS:
            console.log('get cart items');
            console.log(action);
            return Object.assign({}, state, {
                products: action.response.products
            });
        default:
            return state;
    }
    return state;
}
