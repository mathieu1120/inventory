import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemFormCTA from './ItemFormCTA';
import {Field, reduxForm} from 'redux-form';
import ItemFormError from './ItemFormError';
import ItemFormFields from './ItemFormFields';

class ItemForm extends Component {

    static propTypes = {
        form: PropTypes.string.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        pristine: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
        deleteNewItem: PropTypes.func.isRequired
    }

    render() {
        console.log('render form');
        return (
            <form
                className="item-form form-horizontal container-fluid">
                <Field type="hidden" component="input" name="id"/>
                <div className="col-md-9">
                    <ItemFormError />
                    <ItemFormFields form={this.props.form} />
                </div>
                <div className="col-md-3">
                    <ItemFormCTA
                        handleSubmit={this.props.handleSubmit}
                        pristine={this.props.pristine}
                        submitting={this.props.submitting}
                        reset={this.props.reset}
                        deleteNewItem={this.props.deleteNewItem}
                    />
                </div>
            </form>
        );
    }
}

export default reduxForm({
    keepDirtyOnReinitialize: false,
    enableReinitialize: true
})(ItemForm);