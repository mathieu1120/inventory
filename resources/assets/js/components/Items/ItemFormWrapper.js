import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemForm from './ItemForm';

export default class ItemFormWrapper extends Component {
    static propTypes = {
        selectedItem: PropTypes.object.isRequired,
        deleteNewItem: PropTypes.func.isRequired
    }

    render() {
        return (
            <ItemForm
                selectedItem={this.props.selectedItem}
                initialValues={{...this.props.selectedItem}}
                form={`item`}
                deleteNewItem={this.props.deleteNewItem}
            />
        );
    }
}