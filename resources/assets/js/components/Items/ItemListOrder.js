import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ItemList extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        orderBy: PropTypes.string.isRequired,
        orderType: PropTypes.string.isRequired
    }

    render() {
        return (
            <div className="panel-heading filter row">
                <div className="dropdown col-md-10">
                    <button className="btn btn-link btn-sm dropdown-toggle" type="button" id="dropdownMenuType"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        {this.props.orderBy} <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuType">
                        <li><a href="#" onClick={() => this.props.getItems('name', this.props.orderType)}>Name</a></li>
                        <li><a href="#" onClick={() => this.props.getItems('created_at', this.props.orderType)}>Created</a></li>
                    </ul>
                </div>
                <div className="dropdown col-md-2">
                    <button className="btn btn-link btn-sm dropdown-toggle" type="button" id="dropdownMenuOrder"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        {this.props.orderType} <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuOrder">
                        <li><a href="#" onClick={() => this.props.getItems(this.props.orderBy, 'asc')}>asc</a></li>
                        <li><a href="#" onClick={() => this.props.getItems(this.props.orderBy, 'desc')}>desc</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}
