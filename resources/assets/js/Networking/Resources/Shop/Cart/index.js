import AbstractResource from '../../AbstractResource'

export default class Cart extends AbstractResource {

    getResourcePath() {
        return 'api/shop';
    }

    getItems() {
        return this.get(`cart/items`);
    }

    addItem(id) {
        return this.post(`cart/item`, {
            body: JSON.stringify({
                id_product: id
            })
        });
    }

    saveDestination(destination) {
        return this.post(`cart/destination`, {
            body: JSON.stringify({
                destination: destination
            })
        });
    }
}