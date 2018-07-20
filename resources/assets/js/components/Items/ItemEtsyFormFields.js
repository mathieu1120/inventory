import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemImageInput from './ItemImageInput';
import ItemEtsySearch from './ItemEtsySearch';
import {Field, FieldArray} from 'redux-form';

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

    renderFormFields = () => {
        return this.getListOfFields().map((field, index) => {
            return (
                !!field.type && field.type === 'hidden'
                    ? <Field
                        key={index}
                        parse={!!field.parse ? value => field.parse(value) : null }
                        name={field.name}
                        component="input"
                        type="hidden"/>
                    : <div key={index} className="form-group">
                        <label htmlFor={`inputEtsy${field.name}`}
                               className="col-sm-3 control-label">
                            {!!field.label ? field.label : field.name.charAt(0).toUpperCase() + field.name.slice(1).split('_').join(' ')}
                        </label>
                        <div className="col-sm-9">
                            <Field
                                parse={!!field.parse ? value => field.parse(value) : null }
                                className="form-control"
                                id={`inputEtsy${field.name}`}
                                name={field.name}
                                component={!!field.component ? field.component : 'input'}
                                type={!!field.type ? field.type : 'text'}
                                props={!!field.props ? field.props : null}
                            >
                                {
                                    !!field.options
                                        ?
                                        field.options.map((option, index) => {
                                            return (<option key={index} value={option}>{option}</option>);
                                        })
                                        : null
                                }
                            </Field>
                        </div>
                    </div>
            );
        });
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
            </div>
        );
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="col-md-8">
                    {this.renderFormFields()}
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