import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    getFormErrorsFromState
} from '../../selectors/inventory/items';

class ItemFormError extends Component {
    static propTypes = {
        errors: PropTypes.object.isRequired
    }

    renderError = () => {
        let errors = [];
        for (const key in this.props.errors.errors) {
            if (this.props.errors.errors.hasOwnProperty(key)) {
                errors.push(<li key={key}><strong>{key}:</strong> {this.props.errors.errors[key][0]}</li>);
            }
        }
        return errors;
    }

    render() {
        return (
            !jQuery.isEmptyObject(this.props.errors) &&
            <div
                className="alert alert-danger"
                role="alert">
                <strong>
                    {this.props.errors.message}
                </strong>
                <ul>
                    {this.renderError()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errors: getFormErrorsFromState(state),
    };
}

export default connect(mapStateToProps)(ItemFormError);