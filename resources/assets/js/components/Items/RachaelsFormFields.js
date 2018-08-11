import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemImageInput from './ItemImageInput';
import {Field, FieldArray} from 'redux-form';
import FormFields from '../Shared/FormFields';

export default class RachaelsFormFields extends Component {

    static propTypes = {
        form: PropTypes.string.isRequired,
        product: PropTypes.object.isRequired,
        change: PropTypes.func.isRequired
    }

    parseNumber = (value) => {
        return Number(value);
    }

    getListOfFields = () => {
        return [
            {
                name: 'id_product',
                type: 'hidden'
            },
            {
                name: 'name',
                component: 'textarea',
                props: {rows: 3}
            },
            {
                name: 'description',
                component: 'textarea',
                props: {rows: 3}
            },
            {
                name: 'quantity',
                type: 'number',
                parse: this.parseNumber
            },
            {
                name: 'price',
                type: 'number',
                parse: this.parseNumber
            },
            {
                name: 'item_weight',
                type: 'number',
                parse: this.parseNumber
            },
            {
                name: 'item_length',
                type: 'number',
                parse: this.parseNumber
            },
            {
                name: 'item_width',
                type: 'number',
                parse: this.parseNumber
            },
            {
                name: 'item_height',
                type: 'number',
                parse: this.parseNumber
            },
            {
                name: 'category_id',
                component: 'select'
            }
        ]
    }

    renderImages = ({fields}) => {
        return (
            <div>
                {
                    fields.map((field, index) => {
                        return (
                            <Field
                                key={index}
                                name={`${field}.image_url`}
                                props={{
                                    form: this.props.form,
                                    name: `${field}.image_url`,
                                    loading: false
                                }}
                                component={ItemImageInput}
                            />
                        );
                    })
                }
                <button className="btn btn-default" type="button" onClick={() => fields.push()}>Add Picture</button>
            </div>
        );
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="col-md-8">
                    <FormFields fields={this.getListOfFields()} formName={this.props.form} />
                </div>
                <div className="col-md-4">
                    <FieldArray
                        name="images"
                        component={this.renderImages}
                    />
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}