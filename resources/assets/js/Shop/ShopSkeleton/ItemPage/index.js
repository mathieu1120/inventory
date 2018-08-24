import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {getItemFromState, getLoadingFromState} from "../../../selectors/shop/items";
import {getItem} from "../../../actions/shop/items";
import {addItem} from "../../../actions/shop/cart";
import ImageGallery from 'react-image-gallery';

class ItemPage extends Component {
    static propTypes = {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        item: PropTypes.object.isRequired,
        getItem: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        addItem: PropTypes.func.isRequired,
    }

    componentDidMount = () => {
        this.props.getItem(this.props.id);
    }

    renderImages = () => {
        const {
            item: {
                shop_product_media
            },
        } = this.props;

        const images = shop_product_media.map((media) => {
                return {
                    original: media.url,
                    thumbnail: media.url,
                };
            });
        return (
            <ImageGallery items={images} lazyLoad={true} />
        );
    }

    addItem = () => {
        return this.props.addItem(this.props.item.id);
    }

    render() {
        const {
            item,
            id
        } = this.props;

        return (
            !!item.id && item.id === Number(id) ?
                <div className="row">
                    <div className="col-md-4">
                        {this.renderImages()}
                    </div>
                    <div className="col-md-8">
                        <h2>{item.name}</h2>
                        <p>${item.price}</p>
                        <p>{item.description}</p>
                        <p>{item.details}</p>
                        <button className="btn" onClick={this.addItem}>Add to card</button>
                    </div>
                </div>
                :
                <div>
                    loading...
                </div>
        );
    }
}

const mapStateToProps = (state, ownprops) => {
    return {
        id: ownprops.match.params.id,
        item: getItemFromState(state),
        loading: getLoadingFromState(state),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItem: (id) => {
            return dispatch(getItem(id));
        },
        addItem: (id) => {
            return dispatch(addItem(id));
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemPage))