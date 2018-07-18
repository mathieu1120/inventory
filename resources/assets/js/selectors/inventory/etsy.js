
const getEtsySearchResultsFromState = (state) => {
    return state.inventory.etsySearch;
}

const getLoadingEtsySearchFromState = (state) => {
    return state.inventory.metaItems.loading_etsy_search;
}

const getEtsyItemFromState = (state) => {
    return state.inventory.etsyItem;
}

export {
    getEtsySearchResultsFromState,
    getLoadingEtsySearchFromState,
    getEtsyItemFromState
}