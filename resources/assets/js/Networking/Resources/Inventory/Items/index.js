import AbstractResource from '../../AbstractResource'

export default class Items extends AbstractResource {

    getResourcePath() {
        return 'api/inventory';
    }

    list(search, offset) {
        return this.get(`items?offset=${!!offset ? offset : 0}&search=${!!search ? search : ''}`);
    }

    uploadImage(file) {
        let data = new FormData();
        data.set('file_item',file);
        return this.post(
            'uploadImage',
            {
                multipart: true,
                body: data
            }
        );
    }

    create(values) {
        return this.post(
            'items/create',
            {
                body: JSON.stringify(values)
            }
        );
    }

    edit(id, values) {
        return this.post(
            `items/${id}/edit`,
            {
                body: JSON.stringify(values)
            }
        );
    }

    sold(id, values) {
        return this.post(
            `items/${id}/sold`,
            {
                body: JSON.stringify(values)
            }
        );
    }

    deleteItem(values) {
        return this.delete(
            `items/${values.id}`
        );
    }
}