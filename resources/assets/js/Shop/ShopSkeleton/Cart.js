import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {getItems} from "../../actions/shop/cart";
import {getItemsFromState} from "../../selectors/shop/cart";
import {connect} from "react-redux";
import truncate from 'truncate';


class Cart extends Component {
    static propTypes = {
        items: PropTypes.array,
        getItems: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="cart col-md-9">
                <h2>Shopping cart</h2>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th className="col-md-8">ITEM</th>
                        <th className="col-md-2">QTY</th>
                        <th className="col-md-2">PRICE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.items.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="col-md-8">
                                        <div className="col-md-1">
                                            <span className="glyphicon glyphicon-remove" aria-hidden="true">
                                            </span>
                                        </div>
                                        <div className="col-md-2">
                                            <img
                                                src={item.shop_product_media[0].url}
                                                alt={item.name}
                                                className="img-rounded"/>
                                        </div>
                                        <div className="col-md-8">
                                            <Link to={`/items/${item.id}`} className="cart-product-name">
                                                <b>{truncate(item.name, 40)}</b>
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="col-md-2">1</td>
                                    <td className="col-md-2">${item.price}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <Link to="/checkout">
                    <button type="button" className="btn pull-right">
                        Checkout
                    </button>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: getItemsFromState(state)
    };
};

const mapDipatchToProps = (dispatch) => {
    return {
        getItems: () => {
            return dispatch(getItems());
        }
    };
}

export default connect(mapStateToProps, mapDipatchToProps)(Cart);