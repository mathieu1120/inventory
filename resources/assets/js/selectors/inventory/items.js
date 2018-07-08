
const getItemsFromState = (state) => {
    console.log(state);
    return state.inventory.items;
}

const getUploadedImageUrlFromState = (state, key) => {
    if (!!state.inventory.uploads[key]) {
        return state.inventory.uploads[key];
    }
    return '';
}

const getTotalItemsFromState = (state) => {
    return state.inventory.metaItems.total_items;
}

const getNextOffsetItemsFromState = (state) => {
    return state.inventory.metaItems.next_offset;
}

const getLoadingFromState = (state) => {
    return state.inventory.metaItems.loading;
}

const getLoadingImageUploadFromState = (state) => {
    return state.inventory.metaItems.loading_item_image_upload;
}

const getFormErrorsFromState = (state) => {
    return state.inventory.formErrors;
}

export {
    getItemsFromState,
    getUploadedImageUrlFromState,
    getTotalItemsFromState,
    getLoadingFromState,
    getLoadingImageUploadFromState,
    getNextOffsetItemsFromState,
    getFormErrorsFromState
}