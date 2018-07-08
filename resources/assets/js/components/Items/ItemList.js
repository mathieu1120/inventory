import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import InfiniteScroll from './InfiniteScroll';

export default class ItemList extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        onSelectItem: PropTypes.func.isRequired,
        selectedItem: PropTypes.object.isRequired,
        getMoreItems: PropTypes.func.isRequired,
        loadMore: PropTypes.bool.isRequired
    }

    selectItem = (index) => {
        this.props.onSelectItem(index);
    }

    getMoreData = (cb) => {
        return this.props.getMoreItems().then(cb);
    }

    shouldFetch = () => {
        return this.props.loadMore;
    }

    render() {
        return (
            <div className="list-group">
                <InfiniteScroll
                    isTableRowChildren={true}
                    onScrollBottom={this.getMoreData}
                    shouldFetch={this.shouldFetch}
                    scrollWrapperClassName={
                        classnames('infinite-data')
                    }>
                {this.props.items.map((item, index) => {
                    return (
                        <a
                            key={index}
                            href="#"
                            className={classnames(
                                'list-group-item row',
                                {
                                    'active':
                                        (!!this.props.selectedItem.id && this.props.selectedItem.id === item.id)
                                        || (!!this.props.selectedItem.id === false && index === 0)

                                })
                            }
                            onClick={item => this.selectItem(index)}
                        >
                            <p className="col-md-10">
                                {
                                    !!item.name
                                        ? item.name
                                        : <i>New Item</i>
                                }
                            </p>
                            {
                                !!item.image_url &&
                                <img
                                    src={item.image_url}
                                    className="img-circle col-md-2 pull-right"
                                />
                            }
                        </a>
                    );
                })}
                </InfiniteScroll>
            </div>
        );
    }
}
