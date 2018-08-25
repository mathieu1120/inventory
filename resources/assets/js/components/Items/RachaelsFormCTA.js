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
import {getEtsyItemFromState, getEtsyLoadingFromState} from "../../selectors/inventory/etsy";
import {getEtsyItem} from "../../actions/inventory/etsy";

class RachaelsFormCTA extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        pristine: PropTypes.bool.isRequired,
        reset: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        etsyItem: PropTypes.object,
        change: PropTypes.func.isRequired,
        getEtsyItem: PropTypes.func,
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

    componentWillReceiveProps(newProps) {
        console.log('lol')
        if (newProps.item.etsy_listing_id > 0 && jQuery.isEmptyObject(newProps.etsyItem)) {
            this.props.getEtsyItem(newProps.item.etsy_listing_id);
        }
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

    copyFromEtsy = () => {
        const {
            etsyItem,
            change
        } = this.props;

        change('name', etsyItem.item.results[0].title);
        change('description', etsyItem.item.results[0].description);
        change('price', etsyItem.item.results[0].price);
        change('weight', etsyItem.item.results[0].item_weight);
        change('length', etsyItem.item.results[0].item_length);
        change('width', etsyItem.item.results[0].item_width);
        change('height', etsyItem.item.results[0].item_height);
        change('shop_product_media', etsyItem.images.results.map((image) => ({
            url: image.url_fullxfull
        })))
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
                    {
                        this.props.item.etsy_listing_id > 0 && !jQuery.isEmptyObject(this.props.etsyItem) &&
                        <button
                            onClick={this.copyFromEtsy}
                            type="button"
                            className={classnames(
                                "list-group-item",
                            )}>
                            Copy from Etsy
                        </button>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        etsyItem: getEtsyItemFromState(state),
    };
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
        },
        getEtsyItem: (id) => {
            return dispatch(getEtsyItem(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RachaelsFormCTA);