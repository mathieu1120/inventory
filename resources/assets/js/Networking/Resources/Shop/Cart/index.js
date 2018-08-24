import AbstractResource from '../../AbstractResource'

export default class Cart extends AbstractResource {

    getResourcePath() {
        return 'api/shop';
    }

    getItems() {
        return this.get(`cart/items`);
    }

    addItem(id) {
        console.log(id);
        return this.post(`cart/item`, {
            body: JSON.stringify({
                id_product: id
            })
        });
    }
}