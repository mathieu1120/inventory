import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemImageInput from './ItemImageInput';
import {Field, FieldArray} from 'redux-form';
import FormFields from '../Shared/FormFields';

export default class ItemEtsyFormFields extends Component {

    static propTypes = {
        form: PropTypes.string.isRequired,
        item: PropTypes.object.isRequired,
        change: PropTypes.func.isRequired
    }

    parseNumber = (value) => {
        return Number(value);
    }

    parseCommaToNewLine = (value) => {
        return value.split(',').join('\n');
    }

    getListOfFields = () => {
        return [
            {
                name: 'listing_id',
                type: 'hidden'
            },
            {
                name: 'title',
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
                name: 'sku',
                component: 'textarea',
                parse: this.parseCommaToNewLine,
                props: {rows: 3}
            },
            {
                name: 'materials',
                component: 'textarea',
                parse: this.parseCommaToNewLine,
                props: {rows: 3}
            },
            {
                name: 'should_auto_renew',
                type: 'checkbox'
            },
            {
                name: 'shipping_template_id',
                component: 'select',
                label: 'Shipping Template'
            },
            {
                name: 'state',
                component: 'select',
                options: [
                    '', 'active', 'inactive', 'draft'
                ]
            },
            {
                name: 'is_customizable',
                type: 'checkbox'
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
                name: 'non_taxable',
                type: 'checkbox'
            },
            {
                name: 'category_id',
                component: 'select'
            },
            {
                name: 'tags',
                component: 'textarea',
                parse: this.parseCommaToNewLine,
                props: {rows: 3}
            },
            {
                name: 'who_made',
                component: 'select',
                options: [
                    '', 'i_did', 'collective', 'someone_else'
                ]
            },
            {
                name: 'is_supply',
                type: 'checkbox'
            },
            {
                name: 'when_made',
                component: 'select',
                options: [
                    '',
                    'made_to_order',
                    '2010_2018',
                    '2000_2009',
                    '1999_1999',
                    'before_1999',
                    '1990_1998',
                    '1980s',
                    '1970s',
                    '1960s',
                    '1950s',
                    '1940s',
                    '1930s',
                    '1920s',
                    '1910s',
                    '1900s',
                    '1800s',
                    '1700s',
                    'before_1700'
                ]
            },
            {
                name: 'recipient',
                component: 'select',
                options: [
                    '',
                    'men',
                    'women',
                    'unisex_adults',
                    'teen_boys',
                    'teen_girls',
                    'teens',
                    'boys',
                    'girls', 'children', 'baby_boys', 'baby_girls', 'babies', 'birds', 'cats', 'dogs', 'pets', 'not_specified'
                ]
            },
            {
                name: 'occasion',
                component: 'select',
                options: ['',
                    'anniversary', 'baptism', 'bar_or_bat_mitzvah', 'birthday', 'canada_day', 'chinese_new_year',
                    'cinco_de_mayo', 'confirmation', 'christmas', 'day_of_the_dead', 'easter', 'eid', 'engagement',
                    'fathers_day', 'get_well', 'graduation', 'halloween', 'hanukkah', 'housewarming', 'kwanzaa', 'prom',
                    'july_4th', 'mothers_day', 'new_baby', 'new_years', 'quinceanera',
                    'retirement', 'st_patricks_day', 'sweet_16', 'sympathy', 'thanksgiving', 'valentines', 'wedding'
                ]
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