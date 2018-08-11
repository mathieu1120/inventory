import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RachaelsForm from './RachaelsForm';
import {connect} from 'react-redux';
import {
    getProductLoadingFromState,
    getProductFromState
} from '../../selectors/inventory/rachaels';
import {getProduct} from '../../actions/inventory/rachaels';

class RachaelsFormWrapper extends Component {
    static propTypes = {
        selectedItem: PropTypes.object.isRequired,
        product: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        getRachaelsProduct: PropTypes.func.isRequired,
    }

    componentDidMount = () => {
        this.props.getRachaelsProduct(this.props.selectedItem.productId);
    }

    componentWillReceiveProps = (nextProps, nextState) => {
        if (this.props.selectedItem.productId !== nextProps.selectedItem.productId) {
            this.props.getRachaelsProduct(nextProps.selectedItem.productId);
        }
    }

    render() {
        const {
            images,
            product
        } = this.props.product;

        return (
            <div>
                {
                    !!product && !!product.results &&
                    <RachaelsForm
                        product={product.results[0]}
                        initialValues={{
                            ...product.results[0],
                            images: images.results.map(image => {
                                return {image_url: image['url_fullxfull']};
                            }),
                            item_id: this.props.selectedItem.id
                        }}
                        form={`product`}
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
        loading: getProductLoadingFromState(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRachaelsProduct: (id) => {
            return dispatch(getProduct(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RachaelsFormWrapper);