import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import docicon from './img/doctor-icon.jpg';
//import doctorprof from './img/doctorprof.png';
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
    //  this.setState({hospital: this.props.match.params});
    //  console.log(`This is Hospital Name ${this.props.match.params.hospitalname}`)
  };

  getDoctor = () => {
    console.log(localStorage.getItem("token"));
    //  axios.get('/v1/admin/hospitals/'+`?hospitalcode=${this.props.match.params.id}&doctorName=Sanjeev`,
    axios
      .get(
        "http://mconnecthealth.com:2000/v1/doctor",

        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      //console.log('token')
      // axios.get('http://mconnecthealth.com:2000/saket_Hospital')
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        this.setState({ doctors: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  render() {
    const { doctors } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/splash" />;
    }
    return (
      <div className="dashboard_wrap">
        <div className="headeralign">
          <div className="banner-text">
            <img
              className="imgclassName"
              src={doctors.picture}
              alt="Doctor_img"
            />
          </div>
          <div className="flex-container scroll">
            <div className="col5 box-shad">
              <h3>Contact Information</h3>
              <p>
                <i className="far fa-envelope"></i>Name: {doctors.first_name}{" "}
                {doctors.last_name}
              </p>
              <p>
                <i className="fas fa-phone-alt"></i>Date of birth: {doctors.dob}
              </p>
            </div>
            <div className="col5 box-shad">
              <h3>
                <i className="fas fa-map-marker-alt"></i>Address
              </h3>
              <p>
                <b>Degree:</b> {doctors.degree}
              </p>
              <p>
                <b>Designation:</b> {doctors.designation}
              </p>
              <p>
                <b>Department:</b>
                {doctors.department}
              </p>
              <p>
                <b>Experience:</b> {doctors.experience} <b>Email</b>{" "}
                {doctors.email}
              </p>
            </div>
          </div>
        </div>

        <div className="add_departmet">
          <Link to={"/Updatedoctorprofile/" + doctors._id}>
            <i className="far fa-edit"></i> Update Profile{" "}
          </Link>
        </div>
      </div>
    );
  }
}
export default Myprofile;
