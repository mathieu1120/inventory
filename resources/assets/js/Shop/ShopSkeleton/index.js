import React, {Component} from 'react';
import Menu from './Menu';
import Items from './Items';
import ItemPage from './ItemPage/index';
import CartButton from './CartButton';
import Cart from './Cart';
import Checkout from './Checkout';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class ShopSkeleton extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <div className="row">
                        <CartButton/>
                    </div>
                    <div className="row">
                        <div className="col-lg-2">
                            <Menu/>
                        </div>
                        <div className="col-lg-10">
                            <Route exact path="/" component={Items}/>
                            <Route path="/items/:id" component={ItemPage}/>
                            <Route exact path="/cart" component={Cart}/>
                            <Route exact path="/checkout" component={Checkout}/>
                            <Route exact path="/checkout/:step" component={Checkout}/>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}