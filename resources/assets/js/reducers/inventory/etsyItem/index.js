import {
    ETSY_ACTION
} from '../../../actions/inventory/etsy';

const etsyItemsState = {
};

export default function etsyItem(state = etsyItemsState, action) {
    switch (action.type) {
        case ETSY_ACTION.GET_ITEM.SUCCESS:
            return action.response;
        default:
            return state;
    }
    return state;
}