import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import docicon from './img/doctor-icon.jpg';
//import doctorprof from './img/doctorprof.png';
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

class UpdateDoctorprofile extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    //state=initialState;

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
      dob: "",
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
      selectedFile: null,
      submitted: false,
      id: "",
    };
  }
  componentDidMount = () => {
    //  console.log(`This is Hospital ID ${this.props.match.params.id}`)
    this.getDoctor();
    //  this.setState({hospital: this.props.match.params});
    //  console.log(`This is Hospital Name ${this.props.match.params.hospitalname}`)
  };

  getDoctor = () => {
    //  axios.get('/v1/admin/hospitals/'+`?hospitalcode=${this.props.match.params.id}&doctorName=Sanjeev`,
    axios
      .get(
        "http://mconnecthealth.com:2000/v1/doctor" + this.props.match.params.id,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      // axios.get('http://mconnecthealth.com:2000/saket_Hospital')
      .then((response) => {
        console.log(response);
        const data = response.data.data;

        this.setState({
          first_name: data.first_name,
          last_name: data.last_name,
          mobile: data.mobile,
          email: data.email,
          gender: data.gender,
          department: data.department,
          deptcode: data.deptcode,
          dob: data.dob,
          password: data.password,
          picture: data.picture,
          registration_no: data.registration_no,
          experience: data.experience,
          degree: data.degree,
          designation: data.designation,
          specialities: data.specialities,
          id: data._id,
        });

        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  // validate = () => {
  //   let nameError = "";
  //   let emailError = "";
  //   let phoneError = "";

  //   if (!this.state.hospitalcode) {
  // 	nameError = "****Hospital name cannot be blank";
  //   }

  //   if (!this.state.email.includes("@")) {
  // 	emailError = "****Invalid Email";
  //   }
  //   if (!this.state.phone) {
  // 	phoneError = "****Phone number cannot be blank";
  //   }

  //   if (emailError || nameError || phoneError) {
  // 	this.setState({ emailError, nameError , phoneError});
  // 	return false;
  //   }

  //   return true;
  // };

  handleSubmit = (event) => {
    event.preventDefault();
    //const isValid = this.validate();
    //if(isValid){

    const payload = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      mobile: this.state.mobile,
      email: this.state.email,
      gender: this.state.gender,
      department: this.state.department,
      deptcode: this.state.deptcode,
      dob: this.state.dob,
      password: this.state.password,
      picture: this.state.picture,
      registration_no: this.state.registration_no,
      experience: this.state.experience,
      degree: this.state.degree,
      designation: this.state.designation,
      specialities: this.state.specialities,
    };
    axios({
      url: `http://mconnecthealth.com:2000/v1/doctor/${this.state.id}`,
      method: "PUT",
      data: payload,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(() => {
        console.log("Data has been sent to the server successfully");
        console.log(this.state.picture);
        this.resetUserInputs();

        this.setState({
          submitted: true,
        });
      })
      .catch(() => {
        console.log("internal server error");
      });
    //}
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
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
        console.log(data.url);
        this.setState({
          picture: data.url,
        });
        console.log(this.state.picture);
      })
      .catch((err) => {
        console.log("error while uploading" + err);
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
    });
  };
  render() {
    const {
      first_name,
      last_name,
      mobile,
      email,
      dob,
      password,
      picture,
      registration_no,
      experience,
      degree,
      designation,
      specialities,
    } = this.state;

    if (this.state.submitted) {
      return <Redirect to="/Myprofile" />;
    }
    return (
      <div className="dashboard_wrap">
        <div className="banner-text">
          <img className="imgclassName" src={picture} alt="hospital_img" />
        </div>

        <div className="adddept">
          <div className="backarrow">
            {" "}
            <Link to="/Myprofile">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h2>Add Doctor</h2>

          <form action="confirm" onSubmit={this.handleSubmit}>
            <div className="row">
              <input
                type="text"
                name="first_name"
                value={first_name}
                placeholder="Enter First Name"
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="last_name"
                value={last_name}
                placeholder="Enter Email Address"
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="email"
                value={email}
                placeholder="Enter Email Address"
                onChange={this.handleChange}
              />

              <input
                type="password"
                name="mobile"
                value={mobile}
                placeholder="Enter Mobile No"
                onChange={this.handleChange}
              />

              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter New Password"
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="registration_no"
                value={registration_no}
                placeholder="Enter registration_no"
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="dob"
                value={dob}
                placeholder="Enter Date of Birth"
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="experience"
                value={experience}
                placeholder="Enter Experience"
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="degree"
                value={degree}
                placeholder="Enter Degree"
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="designation"
                value={designation}
                placeholder="Enter Designation"
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="specialities"
                value={specialities}
                placeholder="Enter specialities"
                onChange={this.handleChange}
              />

              <div className="row">
                <input
                  type="file"
                  className="uploadbox"
                  name="file"
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>

            <div className="btncontainer">
              <button onClick={this.handleUpload}>
                <i className="fas fa-check"></i>Upload Image{" "}
              </button>
              <button onClick={this.resetUserInputs}>
                <i className="fas fa-check"></i>Reset{" "}
              </button>
              <button type="submit">
                <i className="fas fa-save"></i>Update Details
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default UpdateDoctorprofile;
