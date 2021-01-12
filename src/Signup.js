import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";


class SignupDoctor extends React.Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");

        let LoggedIn = true;
        if (token == null) {
            LoggedIn = false;
        }

        this.state = {
            first_name: "",
            last_name: "",
            mobile: "",
            email: "",
            gender: "",
            password: "",
            registration_no: "",
            nameError: "",
            emailError: "",
            phoneError: "",
            genderError: "",
            passwordError: "",
            regisError: "",
            lnameError: "",
            submitted: false,
            hidden: true,
        };
    }
    componentDidMount = () => {

    };

    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    validate = () => {
        let emailError = "";
        let phoneError = "";
        let nameError = "";
        let genderError = "";
        let passwordError = "";
        let regisError = '';
        let lnameError = '';

        if (!this.state.first_name) {
            nameError = "****Doctor Name cannot be blank";
        }
        if (!this.state.last_name) {
            lnameError = "****Doctor Last Name cannot be blank";
        }
        if (!this.state.email.includes("@")) {
            emailError = "****Invalid Email";
        }
        if (!this.state.mobile) {
            phoneError = "****Mobile number cannot be blank";
        }
        if (!this.state.gender) {
            genderError = "****Gender must be Selected";
        }
        if (!this.state.password) {
            passwordError = "****Password cannot be blank";
        }
        if (this.state.password.length <= 5) {
            passwordError = "****Password Must be greater than 6 Character";
        }
        if (!this.state.registration_no) {
            regisError = "****Registration number cannot be blank";
        }

        if (
            regisError ||
            emailError ||
            nameError ||
            lnameError ||
            passwordError ||
            genderError ||
            phoneError

        ) {
            this.setState({
                emailError,
                phoneError,
                nameError,
                passwordError,
                genderError,
                regisError,
                lnameError
            });
            return false;
        }
        return true;
    };



    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const payload = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                mobile: this.state.mobile,
                email: this.state.email,
                gender: this.state.gender,
                registration_no: this.state.registration_no,
                password: this.state.password
            };
            axios({
                url: `https://stage.mconnecthealth.com/v1/doctor/signup`,
                method: "POST",
                data: payload
            })
                .then((response) => {
                    console.log(response)
                    if (response.data.code === 200) {
                        alert("Success: " + response.data.message);
                        console.log("Data has been sent to the server successfully");
                        this.resetUserInputs();
                        this.setState({
                            submitted: true,
                        });
                    } else {
                        alert("Error: " + response.data.message);
                        console.log(response.data.message);
                    }
                })
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

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };

    onFileHandler = async (event) => {
        await this.setState({
            picture: event.target.files[0],
            loaded: 0,
        });
        console.log(this.state.picture);
    };

    // onChangeHandler = (event) => {
    //   this.setState({
    //     selectedFile: event.target.files[0],
    //     loaded: 0,
    //   });
    // };
    handleGender = (e) => {
        this.setState({
            gender: e.target.value
        })
    }

    onChangeHandler = (event) => {
        console.log("file to upload:", event.target.files[0]);

        this.getBase64(event.target.files[0], (result) => {
            this.setState({
                picture: result,
            });
            console.log(result);
        });
    };

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    }




    resetUserInputs = () => {
        this.setState({
            first_name: "",
            last_name: "",
            mobile: "",
            email: "",
            dob: "",
            password: "",
            picture: "",
            registration_no: "",
            experience: "",
            degree: "",
            designation: "",
            specialities: "",
            registration_no: "",
            emailError: "",
            phoneError: "",
            nameError: "",
            genderError: "",
            passwordError: "",
            regisError: '',
            lnameError: '',
        });
    };
    render() {
        const {
            first_name,
            last_name,
            mobile,
            email,
            password,
            registration_no
        } = this.state;

        if (this.state.submitted) {
            return <Redirect to="/Login" />;
        }
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />;
        }
        return (
            <div className='Appcontainer'>

                <div className="dashboard_wrap">

                    <div className="adddept">
                        <div className="backarrow">
                            {" "}
                            <Link to="/Login">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                        </div>
                        <h2>Create Account</h2>

                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <input
                                    type="text"
                                    name="first_name"
                                    value={first_name}
                                    placeholder="Enter First Name"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.nameError}
                            </div>

                            <div className="row">
                                <input
                                    type="text"
                                    name="last_name"
                                    value={last_name}
                                    placeholder="Enter Last Name"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.lnameError}
                            </div>
                            <div className="row">
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    placeholder="Enter Email Address"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.emailError}
                            </div>
                            <div className="row" style={{ marginLeft: "15px" }} >
                                <input
                                    type={this.state.hidden ? 'password' : 'text'}
                                    name="password"
                                    value={password}
                                    placeholder="Enter password"
                                    onChange={this.handleChange}
                                />
                                <p onClick={this.toggleShow} style={{ marginLeft: "5px" }}>
                                    {this.state.hidden ? <i class="fas fa-eye-slash"></i> : <i class="fas fa-eye"></i>}
                                </p>

                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.passwordError}
                            </div>
                            <div className="row">
                                <input
                                    type="text"
                                    name="mobile"
                                    value={mobile}
                                    placeholder="Enter Mobile No"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.phoneError}
                            </div>
                            <select
                                onChange={this.handleGender}>
                                <option value="">Gender </option>
                                <option value="Male">Male </option>
                                <option value="Female">Female </option>
                                <option value="Other">Other </option>

                            </select>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.genderError}
                            </div>
                            <div className="row">
                                <input
                                    type="text"
                                    name="registration_no"
                                    value={registration_no}
                                    placeholder="Enter Registration No"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.regisError}
                            </div>

                            <div className="btncontainer">
                                <button onClick={this.resetUserInputs} type="reset" className="Updatebtn">
                                    <i className="fas fa-check"></i>Reset{" "}
                                </button>
                                <button type="submit" className="Updatebtn">
                                    <i className="fas fa-save"></i>Sign Up
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default SignupDoctor;
