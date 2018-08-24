import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemEtsyForm from './ItemEtsyForm';
import {connect} from 'react-redux';
import {
    getEtsyItemFromState,
    getEtsyLoadingFromState
} from '../../selectors/inventory/etsy';
import {getEtsyItem} from '../../actions/inventory/etsy';

class ItemEtsyFormWrapper extends Component {
    static propTypes = {
        selectedItem: PropTypes.object.isRequired,
        item: PropTypes.object.isRequired,
        getEtsyItem: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
    }

    componentDidMount = () => {
        if (!!this.props.selectedItem.etsy_listing_id) {
            this.props.getEtsyItem(this.props.selectedItem.etsy_listing_id);
        }
    }

    componentWillReceiveProps = (nextProps, nextState) => {
        if (this.props.selectedItem.etsy_listing_id !== nextProps.selectedItem.etsy_listing_id) {
            this.props.getEtsyItem(nextProps.selectedItem.etsy_listing_id);
        }
    }

    render() {
        const {
            images,
            item
        } = this.props.item

        return (
            <div>
                {
                    this.props.selectedItem.etsy_listing_id > 0 && !!item && !!item.results &&
                    <ItemEtsyForm
                        item={item.results[0]}
                        initialValues={{
                            ...item.results[0],
                            sku: item.results[0].sku.join('\n'),
                            tags: item.results[0].tags.join('\n'),
                            materials: item.results[0].materials.join('\n'),
                            images: images.results.map(image => {
                                return {image_url: image['url_fullxfull']};
                            }),
                            item_id: this.props.selectedItem.id
                        }}
                        form={`etsyItem`}
                    />
                }
                {
                    this.props.loading &&
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
        item: getEtsyItemFromState(state),
        loading: getEtsyLoadingFromState(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEtsyItem: (id) => {
            return dispatch(getEtsyItem(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEtsyFormWrapper);