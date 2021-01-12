import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Nav from "./Nav";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class UpdateDoctorprofile extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      gender: "",
      dob: undefined,
      password: "",
      picture: "",
      registration_no: "",
      experience: "",
      degree: "",
      designation: "",
      specialities: "",
      nameError: "",
      emailError: "",
      phoneError: "",
      dobError: "",
      expError: "",
      degreeError: "",
      designationError: "",
      specialitiesError: "",
      selectedFile: null,
      submitted: false,
      id: "",
    };
  }
  componentDidMount = () => {
    this.getDoctor();
  };

  getDoctor = () => {
    axios
      .get("https://stage.mconnecthealth.com/v1/doctor", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data.data);
        const data = response.data.data;
        this.setState({
          first_name: data.first_name,
          last_name: data.last_name,
          mobile: data.mobile,
          email: data.email,
          gender: data.gender,
          dob: data.dob,
          password: data.password,
          picture: data.picture,
          registration_no: data.registration_no,
          experience: data.experience,
          degree: data.degree,
          designation: data.designation,
          specialities: data.specialities,
          id: data.id,
        });

        console.log("Data has been received!!");
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

  validate = () => {
    let emailError = "";
    let phoneError = "";
    let nameError = "";
    let dobError = "";
    let expError = "";
    let degreeError = "";
    let designationError = "";
    let specialitiesError = "";

    if (!this.state.dob) {
      dobError = "****Date of Birth cannot be blank";
    }

    if (!this.state.experience) {
      expError = "****Experience cannot be blank";
    }
    if (!this.state.degree) {
      degreeError = "****Degree cannot be blank";
    }
    if (!this.state.designation) {
      designationError = "****Designation cannot be blank";
    }
    if (!this.state.specialities) {
      specialitiesError = "****Specialities cannot be blank";
    }

    if (!this.state.first_name) {
      nameError = "****Doctor Name cannot be blank";
    }

    if (!this.state.email.includes("@")) {
      emailError = "****Invalid Email";
    }
    if (!this.state.mobile) {
      phoneError = "****Mobile number cannot be blank";
    }

    if (
      specialitiesError ||
      designationError ||
      degreeError ||
      expError ||
      emailError ||
      nameError ||
      phoneError ||
      dobError
    ) {
      this.setState({
        emailError,
        designationError,
        specialitiesError,
        phoneError,
        nameError,
        dobError,
        expError,
        degreeError,
      });
      return false;
    }

    return true;
  };

  UpdateDoctor = (event) => {
    event.preventDefault();
    const {
      first_name,
      last_name,
      mobile,
      email,
      gender,
      dob,
      password,
      picture,
      //registration_no,
      experience,
      degree,
      designation,
      //deptcode,
      specialities,
      //department
    } = this.state;
    const isValid = this.validate();
    if (isValid) {
      const payload = new FormData();
      payload.append("first_name", first_name);
      payload.append("last_name", last_name);
      payload.append("mobile", mobile);
      payload.append("email", email);
      payload.append("gender", gender);
      payload.append("dob", dob);
      payload.append("password", password);
      payload.append("picture", picture);
      //payload.append("registration_no", registration_no);
      payload.append("experience", experience);
      payload.append("degree", degree);
      payload.append("designation", designation);
      //payload.append("department", department);
      //payload.append("deptcode", deptcode);
      payload.append("specialities", specialities);

      axios({
        url: `https://stage.mconnecthealth.com/v1/doctor/${this.state.id}`,
        method: "PUT",
        data: payload,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
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

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      //console.log("we are in handle submit");
      const payload = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        mobile: this.state.mobile,
        email: this.state.email,
        dob: moment(this.state.dob).format("DD/MM/YYYY"),
        picture: this.state.picture,
        experience: this.state.experience,
        degree: this.state.degree,
        designation: this.state.designation,
        specialities: this.state.specialities,
      };
      axios({
        url: `https://stage.mconnecthealth.com/v1/doctor/${this.state.id}`,
        method: "PUT",
        data: payload,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
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

  handleDatePicker = (date) => {
    console.log(date);
    this.setState({
      dob: date,
    });
  };

  // onChangeHandler = (event) => {
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //     loaded: 0,
  //   });
  // };

  onChangeHandler = (event) => {
    console.log("file to upload:", event.target.files[0]);

    this.getBase64(event.target.files[0], (result) => {
      this.setState({
        picture: result,
      });
      console.log(result);
    });

    // let file = event.target.files[0];

    // if (file) {
    //   const reader = new FileReader();

    //   reader.onload = this._handleReaderLoaded.bind(this);
    //   reader.readAsBinaryString(file);
    // }
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

  //   this.getBase64(idCard, (result) => {
  //      idCardBase64 = result;
  // });

  _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    this.setState({
      picture: btoa(binaryString),
    });
  };

  handleUpload = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("upload_preset", "skyMedi");
    data.append("cloud_name", "skycloud55");

    fetch("https://api.cloudinary.com/v1_1/skycloud55/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          console.log(data.url);
          this.setState({
            picture: data.url,
          });
          console.log(this.state.picture);
        } else {
          alert(data.message)
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
      emailError: "",
      phoneError: "",
      nameError: "",
      dobError: "",
      expError: "",
      degreeError: "",
      designationError: "",
      specialitiesError: ""
    });
  };
  render() {
    const {
      first_name,
      last_name,
      mobile,
      email,
      dob,
      picture,
      experience,
      degree,
      designation,
      specialities,
    } = this.state;

    if (this.state.submitted) {
      return <Redirect to="/Myprofile" />;
    }
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div className='Appcontainer'>
        <Nav />
        <div className="dashboard_wrap">

          <div className="adddept">
            <div className="backarrow">
              {" "}
              <Link to="/Myprofile">
                <i className="fas fa-arrow-left"></i>
              </Link>
            </div>
            <h2>Update Doctor</h2>

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
                {this.state.nameError}
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
              {/* <div className="Calendar">
                Date of Birth:
                  <DatePicker
                  disabled={false}
                  mode="date"
                  //selected={this.state.dob}
                  onChange={(date) => this.handleDatePicker(date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"


                />
              </div> */}

              <div className="row">
                <input
                  type="text"
                  name="dob"
                  value={dob}
                  placeholder="Enter Date of Birth"
                  onChange={this.handleChange}
                />

              </div>
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.dobError}
              </div>

              <div className="row">
                <input
                  type="text"
                  name="experience"
                  value={experience}
                  placeholder="Enter Experience"
                  onChange={this.handleChange}
                />
              </div>
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.expError}
              </div>

              <div className="row">
                <input
                  type="text"
                  name="degree"
                  value={degree}
                  placeholder="Enter Degree"
                  onChange={this.handleChange}
                />
              </div>
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.degreeError}
              </div>

              <div className="row">
                <input
                  type="text"
                  name="designation"
                  value={designation}
                  placeholder="Enter Designation"
                  onChange={this.handleChange}
                />
              </div>
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.designationError}
              </div>

              <div className="row">
                <input
                  type="text"
                  name="specialities"
                  value={specialities}
                  placeholder="Enter specialities"
                  onChange={this.handleChange}
                />
              </div>
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.specialitiesError}
              </div>

              <div className="row">
                <input
                  type="file"
                  className="uploadbox"
                  name="file"
                  accept=".jpeg, .png, .jpg"
                  onChange={this.onChangeHandler}
                />
              </div>


              <div className="btncontainer">
                {/* <button onClick={this.handleUpload}>
                <i className="fas fa-check"></i>Upload Image{" "}
              </button> */}
                <button onClick={this.resetUserInputs} className="Updatebtn" type="reset">
                  <i className="fas fa-check"></i>Reset{" "}
                </button>
                <button type="submit" className="Updatebtn">
                  <i className="fas fa-save"></i>Update Details
              </button>
              </div>
              <img alt="Hospital" src={picture} style={{ width: "50%" }} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default UpdateDoctorprofile;
