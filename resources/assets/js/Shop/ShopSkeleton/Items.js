import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    getItemsFromState,
    getLoadingFromState
} from "../../selectors/shop/items";
import {getItems} from "../../actions/shop/items";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

class Items extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        getItems: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
    }

    componentDidMount = () => {
        this.props.getItems();
    }

    renderItems = () => {
        const {
            items
        } = this.props;

        return (
            <div className="row">
                {items.map((item, index) => {
                    return (
                        <div key={index} className="col-xs-12 col-md-2">
                            <Link to={`/items/${item.id}`}>
                                <div className="thumbnail">
                                    <img
                                        src={item.image_url ? item.image_url : 'http://shop.shoprachaels.com/storage/violette.jpg'}
                                        alt={item.name}/>
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <div className="shop-items">
                {this.renderItems()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: getItemsFromState(state),
        loading: getLoadingFromState(state),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: (search, offset) => {
            return dispatch(getItems(search, offset));
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Items))