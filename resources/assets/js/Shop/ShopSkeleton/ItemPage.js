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
        const {
            item,
            id
        } = this.props;

        return (
            !!item.id && item.id === Number(id) ?
                <div className="row">
                    <div className="col-md-4">
                        <img
                            className="img-responsive"
                            src={item.image_url ? item.image_url : 'http://shop.shoprachaels.com/storage/violette.jpg'}
                            alt={item.name}/>
                    </div>
                    <div className="col-md-8">
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>{item.details}</p>
                        <button className="btn">Add to card</button>
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
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemPage))