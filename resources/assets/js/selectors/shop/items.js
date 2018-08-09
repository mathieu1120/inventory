
const getItemsFromState = (state) => {
    console.log(state);
    return state.shop.items;
}

const getItemFromState = (state) => {
    return state.shop.item;
}

const getLoadingFromState = (state) => {
    return state.shop.metaItems.loading;
}

export {
    getItemsFromState,
    getLoadingFromState,
    getItemFromState
}