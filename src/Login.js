import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import logo from "./img/logo.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let LoggedIn = true;
    if (token == null) {
      LoggedIn = false;
    }
    this.state = {
      email: "",
      password: "",
      token: "",
      LoggedIn,
    };
  }

  validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!this.state.email) {
      emailError = "****User Name cannot be blank";
    }

    if (!this.state.password) {
      passwordError = "****password cannot be blank";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }

    return true;
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const isValid = this.validate();
    if (isValid) {
      const payload = {
        email,
        password,
      };

      axios({
        url: "https://stage.mconnecthealth.com/v1/doctor/login",
        method: "POST",
        data: payload,
      })
        .then(async (response) => {
          const data = response.data.data.token;
          console.log(response);
          try {
            localStorage.setItem("token", data);
            await this.setState({
              token: localStorage.getItem("token"),
            });
          } catch (e) {
            console.log("Something went wrong with sky's Code", e);
          }
        })
        .catch(() => {
          console.log("internal server error");
        });
    }

    // this.setState({
    //   token:localStorage.getItem("token")
    // })

    // if(this.state.token === ''){
    //  return null
    // }
    // else{
    //   this.setState({
    //     LoggedIn: true
    //   })
    // }
    // if(email ==="8882973229" && password ==="shiv"){
    //   localStorage.setItem("token", "aaaefdgadftaerd")
    //   this.setState({
    //     LoggedIn: true
    //   })
    // }
  };
  render() {
    // if (this.state.token === undefined) {
    //   return null;
    // }

    if (this.state.token !== "") {
      return <Redirect to="/Dashboard" />;
    }

    return (
      <section className="login">
        <img src={logo} alt="logo" />
        <h2>WELCOME TO VRCure!</h2>
        <form autocomplete="off" onSubmit={this.submitForm}>
          <div className="loginbox">
            <i className="fas fa-user"></i>
            <input
              placeholder="Your User Name"
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            ></input>
          </div>
          <div className="loginbox">
            <i className="fas fa-lock"></i>
            <input
              placeholder="Your Password"
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            ></input>
            <a href="confirm" className="forgotpass">
              Forgot Password ?
            </a>
          </div>
          <div>
            {/* <button type="submit">Login</button> */}
            <input type="submit" className="button" />
          </div>
        </form>
      </section>
    );
  }
}
export default Login;
