import {
    ITEM_ACTION
} from '../../../actions/inventory/items';

const uploadsState = {
};

export default function uploads(state = uploadsState, action) {
    switch (action.type) {
        case ITEM_ACTION.UPLOAD_ITEM_IMAGE.SUCCESS:
            console.log('upload success');
            console.log(action);
            const newState = Object.assign({}, state, {
                [action.key]: action.response.url
            })
            return newState;
        default:
            return state;
    }
    return state;
}