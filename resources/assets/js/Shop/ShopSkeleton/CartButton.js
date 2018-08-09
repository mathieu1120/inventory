import React, {Component} from 'react';
import { Link } from "react-router-dom";

export default class CartButton extends Component {
    render() {
        return (
            <div className="shop-cart col-md-2">
                <Link to="/cart">
                    <button type="button" className="btn row btn-lg col-md-12">
                        <span className="glyphicon glyphicon-shopping-cart col-md-3" aria-hidden="true"></span>
                        <span className="nb_items col-md-5">1 Item</span>
                        <span className="price col-md-4">$250</span>
                    </button>
                </Link>
            </div>
        );
    }
}
