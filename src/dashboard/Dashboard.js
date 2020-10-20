import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard.css";
import bgimg from "./img/bgimg.jpg";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Nav from '../Nav';

class Dashboard extends React.Component {
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
  render() {
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/" />;
    }
    return (
      <div className='Appcontainer'>
        <Nav />
        <div className="dashboard_wrap">

          <div className="dashboard_maincontent">
            <img src={bgimg} alt="doctor-img" />
            <div className="dashboard_icons">
              <ul>
                <li>
                  <Link to="/Allappointment">
                    <i className="fas fa-plus-square"></i>Upcoming Appointment
                </Link>
                </li>
                <li>
                  <Link to="/ManageSlots">
                    <i className="fas fa-user-md"></i>Manage Slots
                </Link>
                </li>
                <li>
                  <Link to="/Myprofile">
                    <i className="fas fa-user"></i>My Profile
                </Link>
                </li>
                <li>
                  <Link to="/Transaction">
                    <i className="fas fa-credit-card"></i>Transaction
                </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
