import {
    ITEM_ACTION
} from '../../../actions/inventory/items';

const formErrorsState = {
};

export default function formErrors(state = formErrorsState, action) {
    switch (action.type) {
        case ITEM_ACTION.CREATE_ITEM.ERROR:
        case ITEM_ACTION.EDIT_ITEM.ERROR:
            return action.error.response;
        case ITEM_ACTION.CREATE_ITEM.SUCCESS:
        case ITEM_ACTION.EDIT_ITEM.SUCCESS:
            return formErrorsState;
        default:
            return state;
    }
    return state;
}