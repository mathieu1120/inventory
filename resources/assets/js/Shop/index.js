import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from '../reducers/shop.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import ShopSkeleton from './ShopSkeleton/index';

export default class Shop extends Component {
    render() {
        const store = createStore(reducers, composeWithDevTools(
            applyMiddleware(
                thunk
            ),
            // other store enhancers if any
        ));

        return (
            <Provider store={store}>
                <ShopSkeleton />
            </Provider>
        );
    }
}

if (document.getElementById('shop')) {
    ReactDOM.render(<Shop />, document.getElementById('shop'));
}
