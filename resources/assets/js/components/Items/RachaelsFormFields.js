import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemImageInput from './ItemImageInput';
import {Field, FieldArray} from 'redux-form';
import FormFields from '../Shared/FormFields';
import SelectCategory from '../Shared/SelectCategory';

export default class RachaelsFormFields extends Component {

    static propTypes = {
        form: PropTypes.string.isRequired,
        product: PropTypes.object,
        change: PropTypes.func.isRequired
    }

    parseNumber = (value) => {
        return Number(value);
    }

    getListOfFields = () => {
        return [
            {
                name: 'id',
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
                name: 'weight',
                type: 'number',
                parse: this.parseNumber
            },
            {
                name: 'length',
                type: 'number',
                parse: this.parseNumber
            },
            {
                name: 'width',
                type: 'number',
                parse: this.parseNumber
            },
            {
                name: 'height',
                type: 'number',
                parse: this.parseNumber
            },
            {
                name: 'id_category',
                label: 'Category',
                component: SelectCategory
            }
        ]
    }

    renderImages = ({fields}) => {
        return (
            <div>
                {
                    fields.map((field, index) => {
                        return (
                            <div key={index}>
                                <Field
                                    name={`${field}.url`}
                                    props={{
                                        form: this.props.form,
                                        name: `${field}.url`,
                                        loading: false
                                    }}
                                    component={ItemImageInput}
                                />
                                <Field
                                    name={`${field}.id`}
                                    type="hidden"
                                    component="input"
                                />
                            </div>
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
                        name="shop_product_media"
                        component={this.renderImages}
                    />
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}