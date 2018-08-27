import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    reduxForm,
    SubmissionError
} from 'redux-form';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormFields from '../../../components/Shared/FormFields';
import {saveDestinationToCart} from "../../../actions/shop/cart";

class DestinationAddress extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,

    }

    submit = (values) => {
        console.log(values);
        return this.props.dispatch(saveDestinationToCart(values)).then(response => {
            console.log('here');
            this.props.history.push('/checkout/carrier');
        }).catch(error => {
            throw new SubmissionError({
                _error: error
            })
        });
    }

    render() {
        const fields = [
            {
                name: 'first_name',
                label: 'First Name'
            },
            {
                name: 'last_name',
                label: 'Last Name'
            },
            {
                name: 'address',
                component: 'textarea',
                props: {rows: 3}
            },
            {
                name: 'city',
            },
            {
                name: 'zip_code',
                label: 'Zip Code',
                className: 'col-md-2'
            },
            {
                name: 'state',
                component: 'select',
                options: [
                    '',
                    'lol'
                ]
            },
        ];

        return (
            <div className="destination col-md-9">
                <h3>Destination</h3>
                <form className="form-horizontal" onSubmit={this.props.handleSubmit(this.submit)}>
                    <FormFields fields={fields} formName="destination" />
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-9">
                            <button type="submit" className="btn btn-default">Next</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(connect()(reduxForm({
    form: 'destination'
})(DestinationAddress)));