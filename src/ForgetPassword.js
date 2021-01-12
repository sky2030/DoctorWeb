import React from "react";
// import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import axios from "axios";
import logo from "./img/logo.png";
import { Link, Redirect } from "react-router-dom";

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");
        let LoggedIn = true;
        if (token == null) {
            LoggedIn = false;
        }
        this.state = {
            //loggedIn,
            email: "",
            emailError: "",
            submitted: false
        };
    }

    validate = () => {
        let emailError = "";

        if (!this.state.email) {
            emailError = "****User Name cannot be blank";
        }

        if (emailError) {
            this.setState({ emailError });
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
        const { email } = this.state;
        const isValid = this.validate();
        if (isValid) {
            const payload = {
                email
            };

            axios({
                url: "https://stage.mconnecthealth.com/v1/hospital/forget-password",
                method: "POST",
                data: payload,
            })
                .then(async (response) => {
                    console.log(response);
                    if (response.data.code === 200) {
                        this.setState({
                            submitted: true,
                        });
                    } else {
                        alert(response.data.message)
                        console.log("Something Went Wrong");
                    }
                }
                )
                .catch((Error) => {
                    if (Error.message === "Network Error") {
                        alert("Please Check your Internet Connection")
                        console.log(Error.message)
                        return;
                    }
                    if (Error.response.data.code === 403) {
                        alert(Error.response.data.message)
                        console.log(JSON.stringify("Error 403: " + Error.response.data.message))
                        this.setState({
                            loggedIn: false
                        })

                    }
                    else {
                        alert("Something Went Wrong")
                    }
                });
        }
    };


    render() {
        if (this.state.submitted === true) {
            return <Redirect to="/Login" />;
        }
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />;
        }

        return (
            <section className="login">
                <img src={logo} alt="logo" />
                <h2>Welcome to VRCure!</h2>
                <form autocomplete="off" onSubmit={this.submitForm}>
                    <div className="loginbox">
                        <i className="fas fa-lock"></i>
                        <div>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.emailError}
                            </div>
                            <input
                                placeholder="Enter the Email Address"
                                type="text"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                            ></input>
                        </div>
                        <div style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <div>
                                {/* <input type="submit" className="button" /> */}
                                <button type="submit" >Send Password</button>
                            </div>
                            <div>
                                <Link to="/Login">
                                    {/* <input type="submit" className="button" /> */}
                                    <button className='cancelbtn' >Cancel</button>
                                </Link>
                            </div>


                        </div>

                    </div>

                </form>
            </section>
        );
    }
}
export default ForgetPassword;
