import AbstractResource from '../AbstractResource'

export default class Rachaels extends AbstractResource {

    getResourcePath() {
        return 'api/inventory';
    }

    getProduct(id) {
        return this.get(`rachaels-items/${id}`);
    }

    create(values) {
        return this.post(
            'rachaels-items/create',
            {
                body: JSON.stringify(values)
            }
        );
    }

    edit(id, values) {
        return this.post(
            `rachaels-items/${id}/edit`,
            {
                body: JSON.stringify(values)
            }
        );
    }

    getCategories(parentId) {
        return this.get(`rachaels-categories/${parentId}`);
    }

    addCategory(parentId, value) {
        return this.post(`rachaels-items/${parentId}/category`,
            {
                body: JSON.stringify({
                    newCategory: value
                })
            })
    }
}