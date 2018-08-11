import AbstractResource from '../AbstractResource'

export default class Rachaels extends AbstractResource {

    getResourcePath() {
        return 'api/inventory';
    }

    getProduct(id) {
        return this.get(`rachaels-item/${id}`);
    }
}