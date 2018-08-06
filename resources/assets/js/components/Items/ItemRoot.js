import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemList from './ItemList';
import ItemTabs from './ItemTabs';
import {connect} from 'react-redux';
import {isDirty} from 'redux-form';
import {
    getItemsFromState,
    getTotalItemsFromState,
    getNextOffsetItemsFromState,
    getLoadingFromState
} from '../../selectors/inventory/items';

import {getItems} from '../../actions/inventory/items';
import ItemListOrder from './ItemListOrder';

export class ItemRoot extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        getItems: PropTypes.func.isRequired,
        totalItems: PropTypes.number.isRequired,
        loading: PropTypes.bool.isRequired,
        nextOffset: PropTypes.number.isRequired,
        currentFormDirty: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            items: props.items,
            selectedItemIndex: 0,
            orderBy: 'name',
            orderType: 'asc',
            search: ''
        }

    }

    componentWillReceiveProps = (nextProps, nextState) => {
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
    }

    getMoreItems = () => {
        return this.props.getItems(this.state.search, this.props.nextOffset, this.state.orderBy, this.state.orderType);
    }

    getItemsByOrder = (orderBy, orderType) => {
        this.setState({
            orderBy: orderBy,
            orderType: orderType
        });
        return this.props.getItems(this.state.search, 0, orderBy, orderType);
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
        return this.props.getItems(event.target.value, this.props.nextOffset, this.state.orderBy, this.state.orderType);
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
                    <div className="panel panel-default">
                        <ItemListOrder
                            getItems={this.getItemsByOrder}
                            orderBy={this.state.orderBy}
                            orderType={this.state.orderType}
                        />
                        <ItemList
                            items={this.state.items}
                            onSelectItem={this.onSelectItem}
                            selectedItem={selectedItem}
                            getMoreItems={this.getMoreItems}
                            loadMore={this.props.nextOffset > 0}
                            isFormDirty={this.props.currentFormDirty}
                        />
                    </div>
                </div>
                <div className="col-md-9">
                    {
                        this.state.items.length > 0 &&
                        <div>
                            <ItemTabs
                                selectedItem={selectedItem}
                                deleteNewItem={this.deleteNewItem}
                            />
                        </div>
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
        currentFormDirty: isDirty('item')(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: (search, offset, orderBy = 'name', orderType = 'asc') => {
            return dispatch(getItems(search, offset, orderBy, orderType));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemRoot);