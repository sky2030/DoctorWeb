import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import * as FaIcons from 'react-icons/fa';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
//import * as GrIcons from "react-icons/gr";
import * as BsIcons from "react-icons/bs";

class AppointmentCard extends React.Component {
  render() {
    return (
      <div className="maintrans">
        <h3>25 JUNE 2020</h3>
        <div className="alltransation">
          {/* <div>
		   <p><b>Invoice No</b></p>
		   <p>#INVR5RK6SOYH2</p>
		   </div>  */}
          <div className="MarginTop10">
            <p>
              <b>Patient</b>
            </p>
            <p>Avneet Dixit</p>
          </div>
          <div className="MarginTop10">
            <p>
              <b>Symptom</b>
            </p>
            <p>Fever and Cold</p>
          </div>
          <div className="MarginTop10">
            <button>
              <IoIcons.IoMdListBox className="CardIcons" />
            </button>
            <p>Reports</p>
          </div>
          <div className="MarginTop10">
            <button>
              <AiIcons.AiFillFile className="CardIcons" />
            </button>
            <p>Precsription</p>
          </div>
          <div className="MarginTop10">
            <button>
              <BsIcons.BsCameraVideoFill className="CardIcons" />
            </button>
            <p>Start Consultation</p>
          </div>
        </div>
      </div>
    );
  }
}
export default AppointmentCard;
