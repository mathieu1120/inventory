import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemImageInput from './ItemImageInput';
import ItemEtsySearch from './ItemEtsySearch';
import {Field} from 'redux-form';

export default class ItemFormFields extends Component {

    static propTypes = {
        form: PropTypes.string.isRequired,
        selectedItem: PropTypes.object.isRequired,
        change: PropTypes.func.isRequired
    }

    etsyItemChangeId = (id) => {
        this.props.change('etsy_listing_id', id);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="inputName" className="col-sm-3 control-label">Name</label>
                        <div className="col-sm-9">
                            <Field
                                className="form-control"
                                id="inputName"
                                name="name"
                                placeholder="Item's Name"
                                component="input"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputCost" className="col-sm-3 control-label">Cost</label>
                        <div className="col-sm-9">
                            <Field
                                parse={value => Number(value)}
                                className="form-control"
                                type="number"
                                id="inputCost"
                                name="cost"
                                placeholder="Item's Cost"
                                component="input"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPrice" className="col-sm-3 control-label">Price</label>
                        <div className="col-sm-9">
                            <Field
                                parse={value => Number(value)}
                                className="form-control"
                                type="number"
                                id="inputPrice"
                                name="price"
                                placeholder="Item's Price"
                                component="input"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputSoldAt" className="col-sm-3 control-label">Sold Date</label>
                        <div className="col-sm-9">
                            <Field
                                className="form-control"
                                type="date"
                                id="inputSoldAt"
                                name="sold_at"
                                placeholder="Item's Sold Date"
                                component="input"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputSoldPrice" className="col-sm-3 control-label">Sold Price</label>
                        <div className="col-sm-9">
                            <Field
                                parse={value => Number(value)}
                                className="form-control"
                                type="number"
                                id="inputSoldPrice"
                                name="sold_price"
                                placeholder="Item's Sold Price"
                                component="input"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputShippingCost" className="col-sm-3 control-label">Shipping Cost</label>
                        <div className="col-sm-9">
                            <Field
                                parse={value => Number(value)}
                                className="form-control"
                                type="number"
                                id="inputShippingCost"
                                name="shipping_cost"
                                placeholder="Item's Shipping Cost"
                                component="input"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputShippingPrice" className="col-sm-3 control-label">Shipping
                            Price</label>
                        <div className="col-sm-9">
                            <Field
                                parse={value => Number(value)}
                                className="form-control"
                                type="number"
                                id="inputShippingPrice"
                                name="shipping_price"
                                placeholder="Item's Shipping Price"
                                component="input"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputShippingAt" className="col-sm-3 control-label">Ship Date</label>
                        <div className="col-sm-9">
                            <Field
                                className="form-control"
                                type="date"
                                id="inputShippingAt"
                                name="shipping_at"
                                placeholder="Item's Ship Date"
                                component="input"
                            />
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group">
                        <label htmlFor="inputEtsyListingId" className="col-sm-3 control-label">Etsy Item ID</label>
                        <div className="col-sm-9">
                            <Field
                                className="form-control"
                                type="number"
                                id="inputEtsyListingId"
                                name="etsy_listing_id"
                                placeholder="Etsy Listing Id"
                                component="input"
                                disabled={true}
                            />
                        </div>
                    </div>
                    <ItemEtsySearch
                        selectedItem={this.props.selectedItem}
                        change={this.etsyItemChangeId}/>
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