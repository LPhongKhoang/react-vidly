import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: { email: "", password: "" }
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
      .label("Your password")
  };
  schemaDataCommon = {
    email: Joi.string()
      .required()
      .label("Your email"),
    password: Joi.string()
      .required()
      .label("Your password")
  };

  doSubmit = () => {
    // Call http request to server
    console.log("Submit login form");
  };

  render() {
    return (
      <div className="container w-400">
        <h1 className="mb-40">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({ name: "email", label: "Email", autoFocus: true })}
          {this.renderInput({
            name: "password",
            label: "Password",
            type: "password"
          })}

          {this.renderBtnSubmit("Submit")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
