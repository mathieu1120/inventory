import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';

const FormFields = ({fields, formName}) => {
    return (
        <div>
            {fields.map((field, index) => {
                return (
                    !!field.type && field.type === 'hidden'
                        ? <Field
                            key={index}
                            parse={!!field.parse ? value => field.parse(value) : null}
                            name={field.name}
                            component="input"
                            type="hidden"/>
                        : <div key={index} className="form-group">
                            <label htmlFor={`${formName}${field.name}`}
                                   className="col-sm-3 control-label">
                                {!!field.label ? field.label : field.name.charAt(0).toUpperCase() + field.name.slice(1).split('_').join(' ')}
                            </label>
                            <div className="col-sm-9">
                                <Field
                                    parse={!!field.parse ? value => field.parse(value) : null}
                                    className="form-control"
                                    id={`${formName}${field.name}`}
                                    name={field.name}
                                    component={!!field.component ? field.component : 'input'}
                                    type={!!field.type ? field.type : 'text'}
                                    props={!!field.props ? field.props : null}
                                >
                                    {
                                        !!field.options
                                            ?
                                            field.options.map((option, index) => {
                                                return (<option key={index} value={option}>{option}</option>);
                                            })
                                            : null
                                    }
                                </Field>
                            </div>
                        </div>
                );
            })}
        </div>
    )
};

FormFields.propTypes = {
    fields: PropTypes.array.isRequired,
    formName: PropTypes.string.isRequired
};

export default FormFields;