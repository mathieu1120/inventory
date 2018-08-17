import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ItemFormWrapper from './ItemFormWrapper';
import ItemEtsyFormWrapper from './ItemEtsyFormWrapper';
import RachaelsFormWrapper from './RachaelsFormWrapper';

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

    componentWillReceiveProps = (nextProps) => {
        if (this.props.selectedItem.id !== nextProps.selectedItem.id) {
            this.setState({
                index: 0
            });
        }
    }

    render() {
        const tabs = [
            {name: 'Item'},
            {name: 'Etsy'},
            {name: 'Rachael\'s'},
            {name: 'Instagram'}
        ];

        return (
            <div>
                <ul className="nav nav-pills">
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            className={
                                classnames({
                                    "active": (this.state.index === index)
                                })}
                            onClick={() => this.setState({
                                index: index
                            })}
                        >
                            <a href="#">
                                {tab.name}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className={classnames({
                    'hide': (this.state.index !== 0)
                })}>
                    <ItemFormWrapper
                        selectedItem={this.props.selectedItem}
                        deleteNewItem={this.props.deleteNewItem}
                    />
                </div>
                <div className={classnames({
                    'hide': (this.state.index !== 1)
                })}>
                    <ItemEtsyFormWrapper
                        selectedItem={this.props.selectedItem}
                    />
                </div>
                <div className={classnames({
                    'hide': (this.state.index !== 2)
                })}>
                    <RachaelsFormWrapper
                        selectedItem={this.props.selectedItem}
                    />
                </div>
                <div className={classnames({
                    'hide': (this.state.index !== 3)
                })}>
                    Instagram yeah man
                </div>
            </div>
        );
    }
}