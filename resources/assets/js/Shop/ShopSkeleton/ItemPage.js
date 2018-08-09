import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {getItemFromState, getLoadingFromState} from "../../selectors/shop/items";
import {getItem} from "../../actions/shop/items";

class ItemPage extends Component {
    static propTypes = {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        item: PropTypes.object.isRequired,
        getItem: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
    }

    componentDidMount = () => {
        this.props.getItem(this.props.id);
    }

    render() {
        return (
            this.props.item &&
            <div className="row">
                <img
                    src={item.image_url ? item.image_url : 'http://shop.shoprachaels.com/storage/violette.jpg'}
                    alt={item.name}/>
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p>{item.details}</p>
                <button className="btn">Add to card</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        item: getItemFromState(state),
        loading: getLoadingFromState(state),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItem: (id) => {
            return dispatch(getItem(id));
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemPage))