import {
    RACHAELS_ACTION
} from '../../../actions/inventory/rachaels';

const productState = {
};

export default function rachaelsProduct(state = productState, action) {
    switch (action.type) {
        case RACHAELS_ACTION.GET_PRODUCT.SUCCESS:
        case RACHAELS_ACTION.SAVE_PRODUCT.SUCCESS:
            return action.response;
        default:
            return state;
    }
    return state;
}