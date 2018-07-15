import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    getEtsySearchResultsFromState,
    getLoadingEtsySearchFromState
} from '../../selectors/inventory/etsy';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import truncate from 'truncate';

class ItemEtsyResultsAssoc extends Component {
    static propTypes = {
        results: PropTypes.array,
        searchValue: PropTypes.string.isRequired,
        loading: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
    }

    selectItem = (index) => {
        this.props.onClick(this.props.results[index]);
    }

    render() {
        return (
            <div className="form-group ">
                <label className="control-label col-sm-3">
                    Select:
                </label>
                {
                    this.props.loading ?
                        <div className="col-sm-9">Loading ...</div>
                        :
                        <div className="etsy-results list-group col-sm-9">
                            {this.props.results.map((item, index) => {
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        className={classnames(
                                            'list-group-item',
                                            {
                                                'active': false
                                            })
                                        }
                                        onClick={item => this.selectItem(index)}
                                    >
                                        {truncate(item.title, 40)}
                                    </button>
                                );
                            })}
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const searchResults = getEtsySearchResultsFromState(state);

    return {
        results: !!searchResults[props.searchValue] ? searchResults[props.searchValue] : [],
        loading: !!getLoadingEtsySearchFromState(state)
    };
}

export default connect(mapStateToProps)(ItemEtsyResultsAssoc);