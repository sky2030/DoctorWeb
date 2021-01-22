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
            hospitals: [],
            departments: [],
            hospitalcode: "",
            deptcode: "",
            hospitalError: ""
        };
    }
    componentDidMount = () => {
        this.GetHospitals()
    };

    GetHospitals = () => {
        axios.get("https://stage.mconnecthealth.com/v1/doctor/list-hospitals")
            .then((response) => {
                console.log(response.data.data);
                if (response.data.code === 200) {
                    const data = response.data.data;
                    this.setState({ hospitals: data });
                    console.log("Hospitals Received!!");
                } else {
                    alert(response.data.message)
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
    };

    GetDepartments = () => {
        const { hospitalcode } = this.state
        let URL = `https://stage.mconnecthealth.com/v1/doctor/list-departments/${hospitalcode}`
        console.log(URL)
        axios.get(URL)
            .then((response) => {
                console.log(response.data.data);
                if (response.data.code === 200) {
                    const data = response.data.data;
                    this.setState({ departments: data });
                    console.log("Departments Received!!");
                } else {
                    alert(response.data.message)
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
        let hospitalError = '';

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
        if (!this.state.hospitalcode) {
            hospitalError = "****Select your respective Hospital";
        }

        if (
            regisError ||
            emailError ||
            nameError ||
            lnameError ||
            passwordError ||
            genderError ||
            phoneError ||
            hospitalError

        ) {
            this.setState({
                emailError,
                phoneError,
                nameError,
                passwordError,
                genderError,
                regisError,
                lnameError,
                hospitalError
            });
            return false;
        }
        return true;
    };



    handleSubmit = (event) => {
        event.preventDefault();
        const { first_name,
            last_name,
            mobile,
            email,
            gender,
            registration_no,
            password,
            hospitalcode,
            deptcode
        } = this.state
        const isValid = this.validate();
        if (isValid) {
            const payload = {
                first_name,
                last_name,
                mobile,
                email,
                gender,
                registration_no,
                password,
                hospitalcode,
                deptcode
            };
            console.log(payload)
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

    handleHospital = async (e) => {
        await this.setState({
            hospitalcode: e.target.value
        })
        this.GetDepartments()
    }

    handleDepartment = (e) => {
        this.setState({
            deptcode: e.target.value
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
            registration_no,
            departments,
            hospitals
        } = this.state;

        let allHospitals = [
            {
                _id: "allhospital",
                hospitalname: "Select Your Hospital",
                hospitalcode: null
            },
            // {
            //     _id: "allhospital1",
            //     hospitalname: "Fortis Hospital",
            //     hospitalcode: "A53VHD21"
            // },
            // {
            //     _id: "allhospital2",
            //     hospitalname: "Ganga Ram Hospital",
            //     hospitalcode: "G87RAM"
            // },
        ];

        allHospitals = allHospitals.concat([...hospitals]);
        const HospitalList = allHospitals.length ? (
            allHospitals.map((item) => {
                return (
                    <option key={item._id} value={item.hospitalcode}>
                        {item.hospitalname}
                    </option>
                );
            })
        ) : (
                <option className="center" value="">No Hospitals</option>
            );

        let alldeptjson = [
            {
                _id: "alldept",
                departmentname: "Select Your Department",
                deptcode: null
            },
            // {
            //     _id: "alldept1",
            //     departmentname: "Cardiology",
            //     deptcode: "B284CR"
            // },
            // {
            //     _id: "alldept2",
            //     departmentname: "Orthopadic",
            //     deptcode: "CN3423H"
            // },
        ];

        alldeptjson = alldeptjson.concat([...departments]);
        const DeptList = alldeptjson.length ? (
            alldeptjson.map((item) => {
                return (
                    <option key={item._id} value={item.deptcode}>
                        {item.departmentname}
                    </option>
                );
            })
        ) : (
                <option className="center" value="">No Departments</option>
            );

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
                            <div className="row">
                                <select
                                    onChange={this.handleGender}
                                    className="selectOption">
                                    <option value="">Gender </option>
                                    <option value="Male">Male </option>
                                    <option value="Female">Female </option>
                                    <option value="Other">Other </option>
                                </select>

                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.genderError}
                            </div>
                            <div className="row">
                                <select onChange={this.handleHospital}
                                    className="selectOption">
                                    {HospitalList}
                                </select>
                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.hospitalError}
                            </div>
                            <div className="row">
                                <select onChange={this.handleDepartment}
                                    className="selectOption">
                                    {DeptList}
                                </select>
                            </div>
                            <div className="btncontainer">
                                <button type="submit" className="Updatebtn">
                                    <i className="fas fa-save"></i>Sign Up
                                </button>
                                <button onClick={this.resetUserInputs}
                                    type="reset" className="Updatebtn">
                                    <i className="fas fa-check"></i>Reset{" "}
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
