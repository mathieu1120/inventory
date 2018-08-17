import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    addCategory,
    getCategories
} from '../../../actions/inventory/rachaels';
import {
    getCategoriesFromState
} from '../../../selectors/inventory/rachaels';

class SelectCategory extends Component {

    static propTypes = {
        addCategory: PropTypes.func.isRequired,
        categories: PropTypes.object.isRequired,
        getRachaelsCategories: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            categories: {},
            fields: [
                {
                    parentId: 0,
                    displayInput: false,
                    textValue: '',
                    id: 0
                }
            ],
        }
    }

    componentDidMount = () => {
        this.props.getRachaelsCategories();
    }

    updateValue = (event, index) => {
        const fields = this.state.fields;

        fields[index].textValue = event.target.value;
        this.setState({
            fields
        });
    }

    displayInput = (index) => {
        const fields = this.state.fields;

        fields[index].textValue = '';
        fields[index].displayInput = true;
        this.setState({
            fields
        });
    }

    addCategory = (index) => {
        const fields = this.state.fields;
        const parentId = index ? this.state.fields[index].parentId : 0;

        fields[index].displayInput = false;
        this.props.addCategory(parentId, fields[index].textValue);
        this.setState({
            fields,
            selectedFields: {
                ...this.state.selectedFields,
                index: {
                    stringValue: fields[index].textValue
                }
            }
        });
    }

    onDropDownSelect = (index, event) => {
        const fields = this.state.fields;

        if (fields.length > index + 1) {
            fields.splice(index + 1);
        }

        fields[index].id = event.target.value;
        fields.push({
            parentId: event.target.value,
            displayInput: false,
            textValue: '',
            id: 0
        });

        this.setState({
            fields
        });
        if (!this.props.categories[event.target.value]) {
            this.props.getRachaelsCategories(event.target.value);
        }
    }

    render () {
        const {
            categories
        } = this.props;
        const {
            fields
        } = this.state;

        let elementArray = [];

        for (const index in fields) {
            if (!fields.hasOwnProperty(index)) {
                continue;
            }
            elementArray.push(
                fields[index].displayInput ?
                    <div key={index}>
                        <input type="text" className="form-control"
                               onChange={(event) => this.updateValue(event, index)}/>
                        <span
                            className="badge"
                            onClick={() => {
                                this.addCategory(index)
                            }}>
                            <span className="glyphicon glyphicon-ok"></span>
                        </span>
                    </div>
                    :
                    <div key={index}>
                        <select
                            className="form-control"
                            onChange={(event) => this.onDropDownSelect(Number(index), event)}
                            defaultValue={this.state.fields[index].id}
                        >
                            <option>Choose</option>
                            {
                                !!categories[fields[index].parentId] && categories[fields[index].parentId].map((category, i) => {
                                    return (
                                        <option
                                            value={category.id}
                                            key={i}
                                        >{category.name}</option>
                                    );
                                })
                            }
                        </select>
                        {
                            !!this.state.fields[index].id ? null :
                                <span
                                    className="badge"
                                    onClick={() => {
                                        this.displayInput(index)
                                    }}>
                                    <span className="glyphicon glyphicon-plus"></span>
                                </span>
                        }
                    </div>
            );
        }

        return (
            <div>
                {elementArray}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: getCategoriesFromState(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCategory: (parentId, value) => {
            return dispatch(addCategory(parentId, value));
        },
        getRachaelsCategories: (parentId = 0) => {
            return dispatch(getCategories(parentId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory);