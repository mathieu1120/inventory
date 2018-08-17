import {
    RACHAELS_ACTION
} from '../../../actions/inventory/rachaels';

const categoriesState = {
};

export default function rachaelsCategories(state = categoriesState, action) {
    switch (action.type) {
        case RACHAELS_ACTION.GET_CATEGORIES.SUCCESS:
        case RACHAELS_ACTION.ADD_CATEGORY.SUCCESS:
            return Object.assign({}, state, {
                [action.parentId]: action.response.categories
            });
        default:
            return state;
    }
    return state;
}