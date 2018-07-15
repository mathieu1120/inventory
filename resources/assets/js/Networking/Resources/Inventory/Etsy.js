import AbstractResource from '../AbstractResource'

export default class Etsy extends AbstractResource {

    getResourcePath() {
        return 'api/inventory';
    }

    searchItem(keyword) {
        return this.get(`etsy-items?keyword=${keyword}`);
    }

    getItem(id) {
        return this.get(`etsy-item/${id}`);
    }
}