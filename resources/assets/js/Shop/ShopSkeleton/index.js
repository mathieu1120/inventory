import React, {Component} from 'react';
import Menu from './Menu';
import Items from './Items';

export default class ShopSkeleton extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2">
                        <Menu/>
                    </div>
                    <div className="col-lg-10">
                        <Items/>
                    </div>
                </div>
            </div>
        );
    }
}