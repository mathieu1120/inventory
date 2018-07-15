import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchEtsyItem} from '../../actions/inventory/etsy';
import PropTypes from 'prop-types';
import ItemEtsyResultsAssoc from './ItemEtsyResultsAssoc';

class ItemEtsySearch extends Component {
    static propTypes = {
        searchEtsyItem: PropTypes.func.isRequired,
        selectedItem: PropTypes.object.isRequired,
        change: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            display: false
        }
    }

    keywordChange = (event) => {
        this.setState({
            search: event.target.value
        });
        return this.props.searchEtsyItem(event.target.value);
    }

    onSelectItem = (item) => {
        this.props.change(item.listing_id);
    }

    toggleSearch = () => {
        this.setState({
            display: !this.state.display
        });
    }

    render() {
        return (
            <div>
                <p className="col-sm-offset-3" onClick={this.toggleSearch}>Find your Etsy Item</p>
                {
                    this.state.display &&
                    <div>
                        <div className="form-group">
                            <label htmlFor="inputName" className="col-sm-3 control-label">Keywords</label>
                            <div className="col-sm-9">
                                <input
                                    onChange={this.keywordChange}
                                    className="form-control"
                                    placeholder="Type your keywords to search your etsy listing"
                                />
                            </div>
                        </div>
                        < ItemEtsyResultsAssoc
                            onClick={this.onSelectItem}
                            searchValue={this.state.search}/>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchEtsyItem: (values) => {
            dispatch(searchEtsyItem(values));
        }
    };
};

export default connect(null, mapDispatchToProps)(ItemEtsySearch);