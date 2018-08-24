import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {getItemsFromState} from '../../selectors/shop/cart';
import {getItems} from "../../actions/shop/cart";

class CartButton extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        getItems: PropTypes.func.isRequired
    }

    componentDidMount = () => {
        if (!this.props.items.length) {
            this.props.getItems();
        }
    }

    render() {
        const {
            items
        } = this.props;

        let price = 0;

        items.forEach((item) => price += item.price);

        return (
            <div className="shop-cart col-md-2">
                <Link to="/cart">
                    <button type="button" className="btn row btn-lg col-md-12">
                        <span className="glyphicon glyphicon-shopping-cart col-md-3" aria-hidden="true"></span>
                        <span className="nb_items col-md-5">{items.length} {`Item${items.length > 1 ? 's' : ''}`}</span>
                        <span className="price col-md-4">${price}</span>
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

export default connect(mapStateToProps, mapDipatchToProps)(CartButton);