import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemEtsyForm from './ItemEtsyForm';

export default class ItemEtsyFormWrapper extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
    }

    render() {
        const {
            images,
            item
        } = this.props.item

        return (
            <ItemEtsyForm
                item={item.results[0]}
                initialValues={{
                    ...item.results[0],
                    tags: item.results[0].tags.join('\n'),
                    materials: item.results[0].materials.join('\n'),
                    images: images.results.map(image => {
                        return {image_url : image['url_fullxfull']};
                    })
                }}
                form={`etsyItem`}
            />
        );
    }
}