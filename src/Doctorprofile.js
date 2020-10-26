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
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  render() {
    const { doctors } = this.state;

    if (localStorage.getItem("token") == null) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Appcontainer">
        <Nav />

        <div className="dashboard_wrap">
          <div className="headeralign">
            <div className="banner-text">
              <img
                style={{
                  width: "30vw",
                  height: "20em",
                  borderColor: "blue",
                  borderRadius: "3em",
                  marginTop: "1em",
                }}
                src={doctors.picture}
                alt="Doctor_img"
              />
            </div>

            <div className="flex-container scroll">
              <div className="col5 box-shad">
                <h3>Contact Information</h3>
                <p>
                  <i className="fas fa-user-md"></i> <b>Name: </b>
                  {doctors.first_name} {doctors.last_name}
                </p>
                <p>
                  <i className="far fa-envelope"></i> <b>Email: </b>
                  {doctors.email}
                </p>
                <p>
                  <i className="fas fa-phone-alt"></i> <b>Phone: </b>{" "}
                  {doctors.mobile}
                </p>
              </div>
              <div className="col5 box-shad">
                <h3>
                  <i className="fas fa-map-marker-alt"></i>Address
                </h3>
                <p>
                  <b>Degree: </b>
                  {doctors.degree}
                </p>
                <p>
                  <b>Designation: </b>
                  {doctors.designation}
                </p>
                <p>
                  <b>Department: </b>
                  {doctors.department}
                </p>
                <p>
                  <b>Experience: </b>
                  {doctors.experience}
                </p>
                <p>
                  <b>specialities: </b>
                  {doctors.specialities}
                </p>
              </div>
            </div>
          </div>

          <div className="add_departmet">
            <Link to="/Updatedoctorprofile">
              <i className="far fa-edit"></i> Update Profile{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Myprofile;
