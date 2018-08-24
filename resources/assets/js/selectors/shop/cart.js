
const getItemsFromState = (state) => {
    console.log(state);
    return state.shop.cart.products;
}

export {
    getItemsFromState,
}