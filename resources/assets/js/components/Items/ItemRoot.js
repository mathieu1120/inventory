import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemList from './ItemList';
import ItemFormWrapper from './ItemFormWrapper';
import ItemEtsyFormWrapper from './ItemEtsyFormWrapper';
import {connect} from 'react-redux';
import {
    getItemsFromState,
    getTotalItemsFromState,
    getNextOffsetItemsFromState,
    getLoadingFromState
} from '../../selectors/inventory/items';
import {
    getEtsyItemFromState
} from '../../selectors/inventory/etsy';

import {getItems} from '../../actions/inventory/items';
import {getEtsyItem} from '../../actions/inventory/etsy';

export class ItemRoot extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        getItems: PropTypes.func.isRequired,
        totalItems: PropTypes.number.isRequired,
        loading: PropTypes.bool.isRequired,
        nextOffset: PropTypes.number.isRequired,
        getEtsyItem: PropTypes.func.isRequired,
        etsyItem: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            items: props.items,
            selectedItemIndex: 0,
            search: ''
        }

    }

    componentWillReceiveProps = (nextProps, nextState) => {
        if (this.state.items.length === 0
            && nextProps.items.length > 0) {
            this.props.getEtsyItem(nextProps.items[this.state.selectedItemIndex].etsy_listing_id);
        }

        this.setState({
            items: nextProps.items
        });
    }

    componentDidMount = () => {
        this.props.getItems();
    }

    onSelectItem = (index) => {
        this.setState({
            selectedItemIndex: index
        });
        if (!!this.state.items[index].etsy_listing_id) {
            this.props.getEtsyItem(this.state.items[index].etsy_listing_id);
        }
    }

    getMoreItems = () => {
        return this.props.getItems(this.state.search, this.props.nextOffset);
    }

    createNewItem = () => {
        const newItems = this.state.items;

        newItems.unshift({});
        this.setState({
            selectedItemIndex: 0,
            items: newItems
        });
    }

    deleteNewItem = () => {
        const newItems = this.state.items;

        newItems.splice(0, 1);
        this.setState({
            items: newItems
        });
    }

    search = (event) => {
        this.setState({
            search: event.target.value
        })
        return this.props.getItems(event.target.value);
    }

    render() {
        const selectedItem = !!this.state.items[this.state.selectedItemIndex]
            ? this.state.items[this.state.selectedItemIndex]
            : {};

        console.log('render item root');

        return (
            <div className="row">
                <div className="col-md-3">
                    {
                        (this.state.items.length > 0 || this.state.search) &&
                        <div className="container-fluid">
                            <div className="row search">
                                <input
                                    onChange={this.search}
                                    type="text"
                                    className="form-control col-md-12"
                                    placeholder="Search..."/>
                            </div>
                            <div className="row">
                                <p className="col-md-10">{this.state.items.length} / {this.props.totalItems} Items</p>
                                {
                                    !!this.state.items[0] &&
                                    this.state.items[0].id &&
                                    !this.state.search &&
                                    <div className="col-md-2 add_new_item_wrapper">
                                        <span className="badge" onClick={this.createNewItem}>
                                            <span
                                                className="glyphicon glyphicon-plus">
                                            </span>
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    <ItemList
                        items={this.state.items}
                        onSelectItem={this.onSelectItem}
                        selectedItem={selectedItem}
                        getMoreItems={this.getMoreItems}
                        loadMore={this.props.nextOffset > 0}
                    />
                </div>
                <div className="col-md-9">
                    {
                        this.state.items.length > 0 &&
                        <ItemFormWrapper
                            selectedItem={selectedItem}
                            deleteNewItem={this.deleteNewItem}
                        />
                    }
                    {
                        !!this.props.etsyItem.listing_id &&
                        <ItemEtsyFormWrapper item={this.props.etsyItem} />
                    }
                </div>
                {
                    ((this.state.items.length <= 0 && !this.state.search) || this.props.loading) &&
                    <div className="loady-wrapper">
                        <div className="loady">
                            <div className="helper"></div>
                            <span
                                className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: getItemsFromState(state),
        totalItems: getTotalItemsFromState(state),
        nextOffset: getNextOffsetItemsFromState(state),
        loading: getLoadingFromState(state),
        etsyItem: getEtsyItemFromState(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: (search, offset) => {
            return dispatch(getItems(search, offset));
        },
        getEtsyItem: (id) => {
            return dispatch(getEtsyItem(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemRoot);