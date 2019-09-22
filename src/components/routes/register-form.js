import React from "react";
import Form from "./../common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: { email: "", password: "", name: "" }
  };

  schemaDataSpec = {
    email: Joi.string()
      .email()
      .required()
      .label("Your email"),
    password: Joi.string()
      .min(6)
      .max(20)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,}$/)
      .required()
      .label("Your password"),
    name: Joi.string()
      .min(4)
      .max(20)
      .regex(/^[\w]{4,20}$/)
      .required()
      .label("Your nickname")
  };
  schemaDataCommon = {
    email: Joi.string()
      .required()
      .label("Your email"),
    password: Joi.string()
      .required()
      .label("Your password"),
    name: Joi.string()
      .required()
      .label("Your nickname")
  };

  doSubmit = () => {
    // Call http request to server
    console.log("Submit register form");
  };

  render() {
    return (
      <div className="container w-400">
        <h1 className="mb-40">Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({name: "email", label: "Email", autoFocus: true})}
          {this.renderInput({name: "password", label: "Password", type: "password"})}
          {this.renderInput({name: "name", label: "Name"})}

          {this.renderBtnSubmit("Submit")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
