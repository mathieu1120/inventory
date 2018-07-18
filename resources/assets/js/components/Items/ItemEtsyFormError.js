import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class ItemEtsyFormError extends Component {
    static propTypes = {
        errors: PropTypes.object.isRequired
    }

    render() {
        return (
            !jQuery.isEmptyObject(this.props.errors) &&
            <div
                className="alert alert-danger"
                role="alert">
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errors: {},
    };
}

export default connect(mapStateToProps)(ItemEtsyFormError);