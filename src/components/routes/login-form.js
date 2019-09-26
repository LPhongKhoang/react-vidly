import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { login } from "../../services/authService";

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

  doSubmit = async () => {
    try{
      const {email, password} = this.state.data;
      
      await login(email, password);
      // redirect to home page  or last denied page: this.props.history.push("/"); But, want to reload page
      window.location = (this.props.location.state && this.props.location.state.from) || "/";
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
