import AbstractResource from '../../AbstractResource'

export default class Items extends AbstractResource {

    getResourcePath() {
        return 'api/shop';
    }

    list(search, offset, orderBy, orderType) {
        return this.get(`items?offset=${!!offset ? offset : 0}&search=${!!search ? search : ''}&orderby=${orderBy}&ordertype=${orderType}`);
    }

    item(id) {
        return this.get(`items/${id}`);
    }
}