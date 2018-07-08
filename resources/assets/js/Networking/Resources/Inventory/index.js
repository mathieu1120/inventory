import Items from './Items'

import AbstractResource from '../AbstractResource'

export default class Inventory extends AbstractResource {
    constructor(sdk) {
        super(sdk);

        this.items = new Items(sdk);
    }

    /**
     * Default behaviour for getting resource domain
     * @returns {string}
     */

    getResourcePath() {
        return 'api';
    }
}

