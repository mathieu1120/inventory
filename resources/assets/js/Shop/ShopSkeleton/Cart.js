import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {getItems} from "../../actions/shop/cart";
import {getItemsFromState} from "../../selectors/shop/cart";
import {connect} from "react-redux";


class Cart extends Component {
    static propTypes = {
        items: PropTypes.array,
        getItems: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="cart row col-md-9">
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
                                    <td>
                                        <div className="col-md-2">
                                            <span className="glyphicon glyphicon-remove col-md-3" aria-hidden="true">
                                            </span>
                                        </div>
                                        <div>
                                            <img
                                                src={item.shop_product_media[0].url}
                                                alt={item.name}
                                                className="img-thumbnail col-md-4"/>
                                        </div>
                                        <Link to={`/items/${item.id}`} className="col-md-6">
                                            <b>{item.name}</b>
                                        </Link>
                                    </td>
                                    <td>1</td>
                                    <td>${item.price}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
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