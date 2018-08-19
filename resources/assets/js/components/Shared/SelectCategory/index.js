import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { formValueSelector } from 'redux-form';
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
        input: PropTypes.object.isRequired,
        categoryTree: PropTypes.array
    }

    constructor(props) {
        super(props);

        this.state = {
            initialCategories: {},
            fields: [{
                parentId: 0,
                displayInput: false,
                textValue: '',
                id: 0
            }]
        }
    }

    componentWillReceiveProps = (newProps) => {
        if (!this.state.fields[0].id) {
            const initialCategories = {};
            let fields = [{
                parentId: 0,
                displayInput: false,
                textValue: '',
                id: 0
            }];

            if (!!newProps.categoryTree && newProps.categoryTree.length) {
                fields = newProps.categoryTree.map((branch) => {
                    initialCategories[branch.category.id_category] = branch.parentBrothers;
                    return {
                        parentId: branch.category.id_category,
                        displayInput: false,
                        textValue: '',
                        id: branch.category.id
                    }
                });
            }

            this.state = {
                fields,
                initialCategories
            }
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

    addInput = (index) => {
        const fields = this.state.fields;
        fields.push({
            parentId: fields[index].id,
            displayInput: true,
            textValue: '',
            id: 0
        });
        this.setState({
            fields
        });
    }

    cancelInput = (index) => {
        const fields = this.state.fields;

        if (!!this.props.categories[fields[index].parentId] || !!this.state.initialCategories[fields[index].parentId]) {
            fields[index].displayInput = false;
            fields[index].textValue = '';
        } else {
            fields.pop();
        }
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
        const value = event.target.value;

        console.log('here');
        if (fields.length > index + 1) {
            fields.splice(index + 1);
        }
        if (value) {
            this.props.input.onChange(value);
        } else {
            this.props.input.onChange(!!fields[index - 1] ? fields[index - 1].id : null);
        }
        fields[index].id = value;

        this.setState({
            fields
        });
        if (!this.props.categories[value]) {
            this.props.getRachaelsCategories(value);
        }
    }

    renderCategoryOptions = (index) => {
        const {
            categories
        } = this.props;
        const {
            fields,
            initialCategories
        } = this.state;

        if (!!categories[fields[index].parentId]) {
            return categories[fields[index].parentId].map((category, i) => {
                return (
                    <option
                        value={category.id}
                        key={i}
                    >{category.name}</option>
                );
            });
        } else if (!!initialCategories[fields[index].parentId]) {
            return initialCategories[fields[index].parentId].map((category, i) => {
                return (
                    <option
                        value={category.id}
                        key={i}
                    >{category.name}</option>
                );
            });
        } else {
            return null;
        }
    }

    render () {
        const {
            fields,
        } = this.state;

        const elementArray = fields.map((field, index) => {
            return (
                field.displayInput ?
                    <div key={index}>
                        <input type="text" className="form-control"
                               onChange={(event) => this.updateValue(event, index)}/>
                        {
                            field.textValue &&
                            <span
                                className="badge"
                                onClick={() => {
                                    this.addCategory(index)
                                }}>
                                <span className="glyphicon glyphicon-ok"></span>
                            </span>
                        }
                        <span
                            className="badge"
                            onClick={() => {
                                this.cancelInput(index)
                            }}>
                                <span className="glyphicon glyphicon-remove"></span>
                            </span>
                    </div>
                    :
                    <div key={index}>
                        <select
                            className="form-control"
                            onChange={(event) => this.onDropDownSelect(Number(index), event)}
                            value={field.id}
                        >
                            <option value={0}>Choose</option>
                            {this.renderCategoryOptions(index)}
                        </select>
                        {
                            (index + 1) === fields.length && Number(field.id) !== 0 &&
                                <span
                                    className="badge"
                                    onClick={() => {
                                        this.addInput(index)
                                    }}>
                                    <span className="glyphicon glyphicon-plus"></span>
                                </span>
                        }
                        {
                            (index + 1) === fields.length && Number(field.id) === 0 &&
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
        });

        return (
            <div>
                {elementArray}
            </div>
        );
    }
}

const selector = formValueSelector('product');

const mapStateToProps = (state) => {
    return {
        categories: getCategoriesFromState(state),
        categoryTree: selector(state, 'category_tree'),
    };
};

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