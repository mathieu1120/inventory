import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import DestinationAddress from "./DestinationAddress";
import ChooseCarrier from "./ChooseCarrier";

class Checkout extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
    }

    render() {
        return (
            <div className="destination col-md-9">
                <h2>Checkout</h2>
                {(jQuery.isEmptyObject(this.props.match.params) || this.props.match.params.step === 'destination' ) && <DestinationAddress />}
                {!jQuery.isEmptyObject(this.props.match.params) && this.props.match.params.step === 'carrier' && <ChooseCarrier />}
            </div>
        );
    }
}

export default connect()(Checkout);