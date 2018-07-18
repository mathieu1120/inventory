import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemImageInput from './ItemImageInput';
import ItemEtsySearch from './ItemEtsySearch';
import {Field} from 'redux-form';

export default class ItemEtsyFormFields extends Component {

    static propTypes = {
        form: PropTypes.string.isRequired,
        item: PropTypes.object.isRequired,
        change: PropTypes.func.isRequired
    }

    getListOfFields = () => {
        return [
            {
                name: 'listing_id',
                type: 'hidden'
            },
            {
                name: 'title'
            },
            {
                name: 'description',
                component: 'textarea'
            },
            {
                name: 'quantity',
                number: 'int'
            },
            {
                name: 'price',
                number: 'float'
            },
            {
                name: 'materials',
                component: 'textarea'
            },
            {
                name: 'renew',
                type: 'checkbox'
            },
            {
                name: 'shipping_template_id',
                component: 'select'
            },
            {
                name: 'state',
                component: 'select',
                options: [
                    'active', 'inactive', 'draft'
                ]
            },
            {
                name: 'is_customizable',
                type: 'checkbox'
            },
            {
                name: 'item_weight',
                number: 'float'
            },
            {
                name: 'item_length',
                number: 'float'
            },
            {
                name: 'item_width',
                number: 'float'
            },
            {
                name: 'item_height',
                number: 'float'
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
                component: 'textarea'
            },
            {
                name: 'who_made',
                component: 'select',
                options: [
                    'i_did', 'collective', 'someone_else'
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
                options: [
                    'anniversary', 'baptism', 'bar_or_bat_mitzvah', 'birthday', 'canada_day', 'chinese_new_year',
                    'cinco_de_mayo', 'confirmation', 'christmas', 'day_of_the_dead', 'easter', 'eid', 'engagement',
                    'fathers_day', 'get_well', 'graduation', 'halloween', 'hanukkah', 'housewarming', 'kwanzaa', 'prom',
                    'july_4th', 'mothers_day', 'new_baby', 'new_years', 'quinceanera',
                    'retirement', 'st_patricks_day', 'sweet_16', 'sympathy', 'thanksgiving', 'valentines', 'wedding'
                ]
            }
        ]
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="inputEtsyTitle" className="col-sm-3 control-label">Title</label>
                        <div className="col-sm-9">
                            <Field
                                className="form-control"
                                id="inputEtsyTitle"
                                name="title"
                                component="input"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <Field
                        name="image_url"
                        props={{
                            form: this.props.form,
                            name: "image_url",
                            loading: false
                        }}
                        component={ItemImageInput}
                    />
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}