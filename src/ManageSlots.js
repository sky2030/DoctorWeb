import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
// import docicon from './img/doctor-icon.jpg';
// import Doctorcard from './Doctorcard';
import * as AiIcons from "react-icons/ai";
import ManageSlotscard from "./ManageSlotscard";
//import Adddoctor from './Adddoctor';

class ManageSlots extends React.Component {
  render() {
    return (
      <div className="dashboard_wrap">
        <div className="allmanage pb15">
          <div className="backarrow1">
            {" "}
            <Link to="/Dashboard">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h2>Manage Slots</h2>
          <div className="flex-container1">
            <div className="doctor-card col">
              <div className="bodytext">
                <p className="slotalign">Monday</p>
                <p className="slotalign1">10:00AM</p>
              </div>
            </div>
            <div className="doctor-card col">
              <div className="bodytext">
                <p className="slotalign">Monday</p>
                <p className="slotalign1">10:20AM</p>
              </div>
            </div>
            <div className="doctor-card col">
              <div className="bodytext">
                <p className="slotalign">Monday</p>
                <p className="slotalign1">10:40AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ManageSlots;
