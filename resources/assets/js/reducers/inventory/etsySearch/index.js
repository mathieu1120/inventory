import {
    ETSY_ACTION
} from '../../../actions/inventory/etsy';

const etsySearchState = {
};

export default function etsySearch(state = etsySearchState, action) {
    switch (action.type) {
        case ETSY_ACTION.SEARCH_ITEM.PENDING:
            return {
                [action.key]: []
            }
        case ETSY_ACTION.SEARCH_ITEM.SUCCESS:
            if (typeof state[action.key] !== 'undefined') {
                return {[action.key]: action.response.searchResults.results};
            }
            return state;
        default:
            return state;
    }
    return state;
}