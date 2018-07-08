import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ItemRoot from './Items/ItemRoot';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

export default class Inventory extends Component {
    render() {
        const store = createStore(reducers, composeWithDevTools(
            applyMiddleware(
                thunk
            ),
            // other store enhancers if any
        ));

        return (
            <Provider store={store}>
                <ItemRoot />
            </Provider>
        );
    }
}

if (document.getElementById('inventory')) {
    ReactDOM.render(<Inventory />, document.getElementById('inventory'));
}
