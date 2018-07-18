import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemEtsyFormCTA from './ItemEtsyFormCTA';
import {Field, reduxForm} from 'redux-form';
import ItemEtsyFormError from './ItemEtsyFormError';
import ItemEtsyFormFields from './ItemEtsyFormFields';

class ItemEtsyForm extends Component {

    static propTypes = {
        form: PropTypes.string.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        pristine: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
        item: PropTypes.object.isRequired
    }

    render() {
        console.log('render etsy form');
        return (
            <form
                className="item-form form-horizontal container-fluid">
                <h2>Etsy Listing</h2>
                <Field type="hidden" component="input" name="id"/>
                <div className="col-md-9">
                    <ItemEtsyFormError />
                    <ItemEtsyFormFields
                        form={this.props.form}
                        item={this.props.item}
                        change={this.props.change}
                    />
                </div>
                <div className="col-md-3">
                    <ItemEtsyFormCTA
                        handleSubmit={this.props.handleSubmit}
                        pristine={this.props.pristine}
                        submitting={this.props.submitting}
                        reset={this.props.reset}
                    />
                </div>
            </form>
        );
    }
}

export default reduxForm({
    keepDirtyOnReinitialize: false,
    enableReinitialize: true
})(ItemEtsyForm);