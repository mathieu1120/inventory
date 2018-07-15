import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {
    saveItem,
    deleteItem,
    soldItem
} from '../../actions/inventory/items';
import ItemModal from './ItemModal';

class ItemFormCTA extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        pristine: PropTypes.bool.isRequired,
        reset: PropTypes.func.isRequired,
        saveItem: PropTypes.func.isRequired,
        soldItem: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        deleteNewItem: PropTypes.func.isRequired
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
                modalTitle: 'Delete Item',
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

    sold = (values) => {
        if (!Number(values.sold_price)) {
            return this.soldOpenModal();
        }
        return this.props.soldItem(values);
    };

    onModalClose = () => {
        this.setState({
           modalOpen: false
        });
    }

    soldOpenModal = () => {
        this.setState({
            modalTitle: 'Sold',
            modalDescription: <p>Please provide the price the item got sold for.</p>,
            modalButtonText: 'Save',
            modalOpen: true,
            modalButtonAction: () => this.setState({
                modalOpen: false
            })
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
                    <br/>
                    <button
                        type="button"
                        className="list-group-item list-group-item-success"
                        onClick={this.props.handleSubmit(this.sold)}
                    >
                        Sold
                    </button>
                    <br/>
                    <button
                        type="button"
                        className="list-group-item list-group-item-danger"
                        onClick={this.props.handleSubmit(this.deleteItem)}
                    >
                        Delete
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

export default connect(null, mapDispatchToProps)(ItemFormCTA);