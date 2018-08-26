import React, {Component} from 'react';
import {
    reduxForm,
} from 'redux-form';
import FormFields from '../../../components/Shared/FormFields'

class DestinationAddress extends Component {
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
                <form className="form-horizontal">
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

export default reduxForm({
    form: 'destination'
})(DestinationAddress);