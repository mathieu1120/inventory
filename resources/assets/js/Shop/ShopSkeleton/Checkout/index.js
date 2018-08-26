import React, {Component} from 'react';
import DestinationAddress from "./DestinationAddress";

class Checkout extends Component {
    render() {
        return (
            <div className="destination col-md-9">
                <h2>Checkout</h2>
                <DestinationAddress/>
            </div>
        );
    }
}

export default Checkout;