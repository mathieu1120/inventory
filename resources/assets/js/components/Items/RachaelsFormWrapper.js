import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RachaelsForm from './RachaelsForm';
import {connect} from 'react-redux';
import {
    getProductLoadingFromState,
    getProductFromState,
} from '../../selectors/inventory/rachaels';
import {
    getProduct,
} from '../../actions/inventory/rachaels';

class RachaelsFormWrapper extends Component {
    static propTypes = {
        selectedItem: PropTypes.object.isRequired,
        product: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        getRachaelsProduct: PropTypes.func.isRequired,
    }

    componentDidMount = () => {
        this.props.getRachaelsProduct(this.props.selectedItem.shop_product_id);
    }

    componentWillReceiveProps = (nextProps, nextState) => {
        console.log('gotta stop requesting in here after creating a new product');
        if (this.props.selectedItem.shop_product_id !== nextProps.selectedItem.shop_product_id) {
            this.props.getRachaelsProduct(nextProps.selectedItem.shop_product_id);
        }
    }

    render() {
        const {
            product
        } = this.props.product;

        return (
            <div>
                {
                    <RachaelsForm
                        product={product}
                        initialValues={{
                            ...product,
                            shop_product_media: !!product && product.shop_product_media.length > 0 ?
                                product.shop_product_media : [{}],
                            item_id: this.props.selectedItem.id
                        }}
                        form={`product`}
                        item={this.props.selectedItem}
                    />
                }
                {
                    this.props.loading &&
                    <div className="loady-wrapper">
                        <div className="loady">
                            <div className="helper">
                            </div>
                            <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate">
                            </span>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        product: getProductFromState(state),
        loading: getProductLoadingFromState(state),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRachaelsProduct: (id) => {
            return dispatch(getProduct(id));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RachaelsFormWrapper);