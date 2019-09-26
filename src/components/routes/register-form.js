import React from "react";
import Form from "./../common/form";
import Joi from "joi-browser";
import { register } from "../../services/userService";
import { loginWithJwt } from "../../services/authService";
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

  doSubmit = async () => {
    try{
      const response = await register(this.state.data);
      loginWithJwt(response.headers["x-auth-token"]);
      // redirect to home page: this.props.history.push("/");. But, want to reload page
      window.location = "/";

    }catch(ex) {
      if(ex.response && ex.response.status===400) {
        const errors = {...this.state.errors};
        errors.email = ex.response.data;
        this.setState({errors});
      }
    }
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
