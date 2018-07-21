import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ItemFormWrapper from './ItemFormWrapper';
import ItemEtsyFormWrapper from './ItemEtsyFormWrapper';

export default class ItemTabs extends Component {
    static propTypes = {
        selectedItem: PropTypes.object.isRequired,
        deleteNewItem: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            index: 0
        };
    }

    render() {
        return (
            <div>
                <ul className="nav nav-pills">
                    <li
                        className={
                            classnames({
                                "active": (this.state.index === 0)
                            })}
                        onClick={() => this.setState({
                            index: 0
                        })}
                    >
                        <a href="#">
                            Item
                        </a>
                    </li>
                    {
                        this.props.selectedItem.etsy_listing_id &&
                        <li className={
                            classnames({
                                "active": (this.state.index === 1)
                            })}
                            onClick={() => this.setState({
                                index: 1
                            })}
                        >
                            <a href="#">
                                Etsy
                            </a>
                        </li>
                    }
                </ul>
                <div className={classnames({
                    'hide': (this.state.index !== 0)
                })}>
                    <ItemFormWrapper
                        selectedItem={this.props.selectedItem}
                        deleteNewItem={this.props.deleteNewItem}
                    />
                </div>
                {
                    this.props.selectedItem.etsy_listing_id &&
                    <div className={classnames({
                        'hide': (this.state.index !== 1)
                    })}>
                        <ItemEtsyFormWrapper etsyItemId={this.props.selectedItem.etsy_listing_id}/>
                    </div>
                }
            </div>
        );
    }
}