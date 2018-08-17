import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RachaelsFormCTA from './RachaelsFormCTA';
import {Field, reduxForm} from 'redux-form';
import RachaelsFormFields from './RachaelsFormFields';

class RachaelsForm extends Component {

    static propTypes = {
        form: PropTypes.string.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        pristine: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
        product: PropTypes.object
    }

    render() {
        console.log('render rachaels form');
        return (
            <form
                className="item-form form-horizontal container-fluid">
                <Field type="hidden" component="input" name="item_Id"/>
                <div className="col-md-9">
                    <RachaelsFormFields
                        form={this.props.form}
                        product={this.props.product}
                        change={this.props.change}
                    />
                </div>
                <div className="col-md-3">
                    <RachaelsFormCTA
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
})(RachaelsForm);