import Items from './Items';
import Cart from './Cart';

import AbstractResource from '../AbstractResource'

export default class Shop extends AbstractResource {
    constructor(sdk) {
        super(sdk);

        this.items = new Items(sdk);
        this.cart = new Cart(sdk);
    }

    /**
     * Default behaviour for getting resource domain
     * @returns {string}
     */

    getResourcePath() {
        return 'api';
    }
}

