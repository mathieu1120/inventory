import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {
    saveItem,
    deleteItem,
    soldItem
} from '../../actions/inventory/rachaels';
import ItemModal from './ItemModal';

class RachaelsFormCTA extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        pristine: PropTypes.bool.isRequired,
        reset: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            modalTitle: '',
            modalDescription: null,
            modalButtonText: '',
            modalOpen: false,
            modalButtonAction: this.onModalClose
        };
    }

    submit = (values) => {
        return this.props.saveItem(values);
    };

    deleteItem = (values) => {
        console.log(values);
        if (!!values.id) {
            return this.setState({
                modalTitle: 'Delete Product',
                modalDescription: <p>Are you sure?</p>,
                modalButtonText: 'Yes, Duh',
                modalOpen: true,
                modalButtonAction: () => {
                    this.setState({
                        modalOpen: false
                    });
                    return this.props.deleteItem(values);
                }
            });
        }
        return this.props.deleteNewItem();
    };

    onModalClose = () => {
        this.setState({
           modalOpen: false
        });
    }

    render() {
        return (
            <div>
                <ItemModal
                    title={this.state.modalTitle}
                    open={this.state.modalOpen}
                    onClose={this.onModalClose}
                    buttonText={this.state.modalButtonText}
                    buttonAction={this.state.modalButtonAction}>
                    {this.state.modalDescription}
                </ItemModal>
                <div className="list-group">
                    <button
                        onClick={this.props.handleSubmit(this.submit)}
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}
                        className={classnames(
                            "list-group-item list-group-item-success",
                            {'disabled': this.props.pristine || this.props.submitting}
                        )}>
                        Save
                    </button>
                    <button
                        onClick={this.props.reset}
                        type="button"
                        disabled={this.props.pristine || this.props.submitting}
                        className={classnames(
                            "list-group-item list-group-item-warning",
                            {'disabled': this.props.pristine || this.props.submitting}
                        )}>
                        Reset
                    </button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveItem: (values) => {
            dispatch(saveItem(values));
        },
        deleteItem: (values) => {
            dispatch(deleteItem(values));
        },
        soldItem: (values) => {
            dispatch(soldItem(values));
        }
    };
};

export default connect(null, mapDispatchToProps)(RachaelsFormCTA);