const getProductLoadingFromState = (state) => {
    return state.inventory.metaItems.loading_rachaels_form;
}

const getProductFromState = (state) => {
    return state.inventory.rachaelsProduct;
}

const getCategoriesFromState = (state) => {
    return state.inventory.rachaelsCategories;
}

export {
    getProductLoadingFromState,
    getProductFromState,
    getCategoriesFromState
}