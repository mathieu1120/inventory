import React, {Component} from 'react';
import PropTypes from "prop-types";

import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class ChooseCarrier extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }


    render() {

        return (
            <div className="carrier col-md-9">
                <h3>Shipping Carrier</h3>
            </div>
        );
    }
}



export default withRouter(connect()(ChooseCarrier));