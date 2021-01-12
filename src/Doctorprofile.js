import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import docicon from './img/doctor-icon.jpg';
//import doctorprof from './img/doctorprof.png';
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Nav from "./Nav";

class Myprofile extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      doctors: {},
    };
  }
  componentDidMount = () => {
    //  console.log(`This is Hospital ID ${this.props.match.params.id}`)
    this.getDoctor();
  };

  getDoctor = () => {
    // console.log(localStorage.getItem("token"));
    axios
      .get("https://stage.mconnecthealth.com/v1/doctor", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.code === 200) {
          const data = response.data.data;
          this.setState({ doctors: data });
          console.log("Data has been received!!");
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

  render() {
    const { doctors } = this.state;

    if (localStorage.getItem("token") == null) {
      return <Redirect to="/" />;
    }

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Appcontainer">
        <Nav />

        <div className="dashboard_wrap2">
          <div className="headeralign">
            <div className="banner-text">
              <img
                src={doctors.picture}
                alt="Doctor_img"
              />
            </div>

            <div className="flex-container scroll">
              <div className="col5 box-shad"
              >
                <h3>Contact Information</h3>
                <p>
                  <i className="fas fa-user-md"></i> <b>Name: </b>
                  {doctors.name}
                </p>
                <p>
                  <i class="fas fa-file-medical-alt"></i><b>Degree: </b>
                  {doctors.degree}
                </p>
                <p>
                  <i class="fas fa-user-nurse"></i><b>Designation: </b>
                  {doctors.designation}
                </p>
                <p>

                  <i class="far fa-building"></i><b>Department: </b>
                  {doctors.department}
                </p>
                <p>
                  <i className="fas fa-user-md"></i><b>Experience: </b>
                  {doctors.experience}
                </p>
                <p>
                  <i class="fas fa-book-medical"></i><b>Specialities: </b>
                  {doctors.specialities}
                </p>
                <p>
                  <i class="fas fa-rupee-sign"></i><b>Consultation Fee: </b>
                  {doctors.consultation_fee}
                </p>
                <p>
                  <i className="far fa-envelope"></i><b>Email: </b>
                  {doctors.email}
                </p>
                <p>
                  <i className="fas fa-phone-alt"></i><b>Phone: </b>{" "}
                  {doctors.mobile}
                </p>
              </div>

            </div>
          </div>
          {/* 
          <div className="add_departmet">
            <Link to="/Updatedoctorprofile">
              <i className="far fa-edit"></i> Update Profile{" "}
            </Link>
          </div> */}
        </div>
        <div className="add_departmet">
          <Link to="/Updatedoctorprofile">
            <i className="far fa-edit"></i> Update Profile{" "}
          </Link>

          {/* <Link to="/addfee">
            <i className="far fa-edit"></i> Update Consultation Fee{" "}
          </Link> */}
        </div>
      </div>
    );
  }
}
export default Myprofile;
