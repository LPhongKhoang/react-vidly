import React, { Component } from "react";
import Joi from "joi-browser";
import Input from './input';
import Dropdown from './drop-donw';

class Form extends Component {
  state = {
    data: {},
    error: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(
      this.state.data,
      this.schemaDataCommon,
      options
    );
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path] = item.message;
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} }); // always keep errors {} (not null or undefined)
    if (errors) {
      return;
    }
    // specific behavior on each form
    this.doSubmit();
  };

  validateField = ({ name, value }) => {
    const { error } = Joi.validate(
      { [name]: value },
      { [name]: this.schemaDataSpec[name] }
    ); // no need to set abortEarly is true
    return error ? error.details[0].message : null;
  };

  handleInputChange = e => {
    // validate each input field
    const errors = { ...this.state.errors };
    const errMsg = this.validateField(e.target);
    if (errMsg) errors[e.target.name] = errMsg;
    else delete errors[e.target.name];

    // copy data to new object
    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;
    // update state: both value and errMsg of that field
    this.setState({ data, errors });
  };

  renderBtnSubmit = label => {
    const { errors } = this.state;
    return (
    <button
      type="submit"
      className="btn btn-primary"
      disabled={Object.keys(errors).length > 0}
    >
      {label}
    </button>
  )};

  renderInput = ({name, label, type, autoFocus}) => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        type={type}
        value={data[name]}
        error={errors[name]}
        autoFocus={autoFocus}
        onChange={this.handleInputChange}
      />
    );
  };

  renderDropdown = ({name, label, dataList, keyProperty, valueProperty}) => {
    const { data, errors} = this.state;
    return (
      <Dropdown
        name={name}
        label={label}
        selectedItemKey={data[name]}
        data={dataList}
        keyProperty={keyProperty}
        valueProperty={valueProperty}
        error={errors[name]}
        onChange={this.handleInputChange}
      />
    );
  }
}

export default Form;
