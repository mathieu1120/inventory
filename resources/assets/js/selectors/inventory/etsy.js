
const getEtsySearchResultsFromState = (state) => {
    return state.inventory.etsySearch;
}

const getLoadingEtsySearchFromState = (state) => {
    return state.inventory.metaItems.loading_etsy_search;
}

const getEtsyLoadingFromState = (state) => {
    return state.inventory.metaItems.loading_etsy_form;
}

const getEtsyItemFromState = (state) => {
    return state.inventory.etsyItem;
}

export {
    getEtsySearchResultsFromState,
    getLoadingEtsySearchFromState,
    getEtsyItemFromState,
    getEtsyLoadingFromState
}