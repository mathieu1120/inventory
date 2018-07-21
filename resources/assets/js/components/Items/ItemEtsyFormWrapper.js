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
        etsyItemId: PropTypes.number.isRequired,
        item: PropTypes.object.isRequired,
        getEtsyItem: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
    }

    componentDidMount = () => {
        this.props.getEtsyItem(this.props.etsyItemId);
    }

    componentWillReceiveProps = (nextProps, nextState) => {
        if (this.props.etsyItemId !== nextProps.etsyItemId) {
            console.log('done');
            this.props.getEtsyItem(nextProps.etsyItemId);
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
                    this.props.etsyItemId && !!item && !!item.results &&
                    <ItemEtsyForm
                        item={item.results[0]}
                        initialValues={{
                            ...item.results[0],
                            tags: item.results[0].tags.join('\n'),
                            materials: item.results[0].materials.join('\n'),
                            images: images.results.map(image => {
                                return {image_url: image['url_fullxfull']};
                            })
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