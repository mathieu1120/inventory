import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import InfiniteScroll from './InfiniteScroll';
import ItemModal from './ItemModal';

export default class ItemList extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        onSelectItem: PropTypes.func.isRequired,
        selectedItem: PropTypes.object.isRequired,
        getMoreItems: PropTypes.func.isRequired,
        loadMore: PropTypes.bool.isRequired,
        isFormDirty: PropTypes.bool.isRequired,
    }

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

    onModalClose = () => {
        this.setState({
            modalOpen: false
        });
    }

    makeTheActualSelectItem = (index) => {
        this.props.onSelectItem(index);
    }

    selectItem = (index) => {
        if (this.props.isFormDirty) {
            this.setState({
                modalTitle: 'Unsaved Form',
                modalDescription: <p>You made some change on the form. Do you want to ignore the changes and continue?</p>,
                modalButtonText: 'Yes',
                modalOpen: true,
                modalButtonAction: () => {
                    this.setState({
                        modalOpen: false
                    });
                    this.makeTheActualSelectItem(index);
                }
            });
        } else {
            this.makeTheActualSelectItem(index);
        }
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
                <ItemModal
                    title={this.state.modalTitle}
                    open={this.state.modalOpen}
                    onClose={this.onModalClose}
                    buttonText={this.state.modalButtonText}
                    buttonAction={this.state.modalButtonAction}>
                    {this.state.modalDescription}
                </ItemModal>
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
                            <span className="col-md-10">
                                {
                                    !!item.name
                                        ? item.name
                                        : <i>New Item</i>
                                }
                            </span>
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
