import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemEtsyForm from './ItemEtsyForm';

export default class ItemEtsyFormWrapper extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
    }

    render() {
        return (
            <ItemEtsyForm
                item={this.props.item}
                initialValues={{
                    ...this.props.item,
                    tags: this.props.item.tags.join('\n'),
                    materials: this.props.item.materials.join('\n')
                }}
                form={`etsyItem`}
            />
        );
    }
}