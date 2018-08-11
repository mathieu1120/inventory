import Items from './Items'
import Etsy from './Etsy'
import Rachaels from './Rachaels'

import AbstractResource from '../AbstractResource'

export default class Inventory extends AbstractResource {
    constructor(sdk) {
        super(sdk);

        this.items = new Items(sdk);
        this.etsy = new Etsy(sdk);
        this.rachaels = new Rachaels(sdk);
    }

    /**
     * Default behaviour for getting resource domain
     * @returns {string}
     */

    getResourcePath() {
        return 'api';
    }
}

