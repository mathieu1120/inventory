import React, {Component} from 'react';

export default class Menu extends Component {
    render() {
        return (
            <div className="shop-menu">
                <ul className="nav nav-pills nav-stacked">
                    <li role="presentation" className="col-md-9">
                        <img
                            className="img-circle img-responsive"
                            alt="logo"
                            src="http://inventory.shoprachaels.com/storage/shop/logo.jpg"
                        />
                        <h1>Rachael's</h1>
                    </li>
                    <li role="presentation"><a href="#">Info</a></li>
                    <li role="presentation" className="dropdown">
                        <a href="#">Shop <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li>category 1</li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}
