import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
//import AppointmentCard from './AppointmentCard';
import { Redirect } from "react-router-dom";
//import * as AiIcons from "react-icons/ai";
//import * as IoIcons from "react-icons/io";
//import * as GrIcons from "react-icons/gr";
//import * as BsIcons from "react-icons/bs";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Nav from "./Nav";
import Spinner from "./img/Spinnergrey.gif";

//import CalendarIcon from "react-calendar-icon"

//const now = moment().hour(0).minute(0);

//const format = "h:mm a";

class Allappointment extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let LoggedIn = true;
    let startDate = moment().startOf("day").format("x");
    let endDate = moment().endOf("day").format("x");

    if (token == null) {
      LoggedIn = false;
    }
    this.state = {
      email: "",
      password: "",
      token: "",
      LoggedIn,
      startDate: startDate,
      endDate: endDate,
      slotDate: new Date(),
      submitted: false,
      isDatePickerAvailable: false,
      appointmentList: "",
      loading: "",
    };
  }

  componentDidMount = () => {
    //console.log(`This is Doctor ID ${this.fetchData.match.params.id}`);
    this.fetchData();
  };

  fetchData = () => {
    //events.preventDefault();
    const {
      //submitted: false,
      //appointmentList,
      startDate,
      endDate,
    } = this.state;

    console.log(`this is start date ${startDate}`);
    console.log(`this is start date ${endDate}`);
    fetch(
      `https://stage.mconnecthealth.com/v1/doctor/slots?day_from=${startDate}&day_to=${endDate}&status[]=booked`,
      {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((results) => {
        console.log(JSON.stringify(results));
        if (results.code === 200) {
          this.setState({
            appointmentList: results.data,
          });
        } else {
          alert(results.message);
        }
      })
      .catch((err) => {
        alert("SOMETHING_WENT_WRONG");
      });
  };

  updateStartEndDate = (sdate) => {
    console.log("date inside update:" + sdate);
    this.setState({
      startDate: moment(sdate).startOf("day").format("x"),
      endDate: moment(sdate).endOf("day").format("x"),
    });
    console.log("Start Date:" + this.state.startDate);
  };
  handleDatePicker = async (date) => {
    console.log(date);
    await this.updateStartEndDate(date);
    this.setState({
      slotDate: date,
    });
    await this.fetchData();
  };

  joinConversationPressed = (item) => {
    fetch(
      `https://stage.mconnecthealth.com/v1/doctor/appointment/join-now?appointment_id=${item.id}`,
      {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((results) => {
        //console.log(results);
        if (results.message !== "success") {
          alert(results.message);
        } else {
          Redirect("EnxConferenceScreen", {
            streamId: results.data.enableX.room_id,
            token: results.data.enableX.token,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("SOMETHING_WENT_WRONG");
      });
  };
  statusForJoinConversation = (item) => {
    //console.log(item);
    return 0;
  };
  //   StringFromTime = (timevalue) => {
  //     if (timevalue <= 0) {
  //       return "12:00 AM";
  //     }
  //     let time = Number(timevalue) / 60000;
  //     let sdate = new Date();
  //     sdate.setHours(Math.floor(time / 60));
  //     sdate.setMinutes(time % 60);
  //     var returnValue = moment(sdate.getTime(), "x").format("hh:mm A");
  // DeviceInfo.is24Hour() ? "HH:mm" : "hh:mm A"

  joinConversationPressed = (item) => {
    fetch(
      `https://stage.mconnecthealth.com/v1/doctor/appointment/join-now?appointment_id=${item.id}`,
      {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((results) => {
        //console.log(results);
        if (results.message != "success") {
          alert(results.message);
        } else {
          Redirect("EnxConferenceScreen", {
            streamId: results.data.enableX.room_id,
            token: results.data.enableX.token,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("SOMETHING_WENT_WRONG");
      });
  };
  statusForJoinConversation = (item) => {
    //console.log(item);
    return 0;
  };
  StringFromTime = (timevalue) => {
    if (timevalue <= 0) {
      return "12:00 AM";
    }
    let time = Number(timevalue) / 60000;
    let sdate = new Date();
    sdate.setHours(Math.floor(time / 60));
    sdate.setMinutes(time % 60);
    var returnValue = moment(sdate.getTime(), "x").format("hh:mm A");

    return returnValue;
  };

  render() {
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/" />;
    }

    const { appointmentList } = this.state;
    const appointmentdata = appointmentList.length ? (
      appointmentList.map((item) => {
        return (
          <div className="maintrans">
            <h3>
              {moment(item.day_millis).format("ll")} ||{" "}
              {this.StringFromTime(item.time_millis)}
            </h3>
            <div className="alltransation">
              <div className="MarginTop10">
                <p>
                  <b>Patient</b>
                </p>
                <p>{item.patient.name}</p>
              </div>

              <Link to="/Reports" className="MarginTop10">
                <button
                  style={{
                    width: "9em",
                    height: "3em",
                    borderRadius: "0.5em",
                    color: "white",
                    backgroundColor: "#3D3DB5",
                  }}
                >
                  <b> View Reports</b>
                </button>
              </Link>
              <div className="MarginTop10">
                <button
                  onClick={() => this.joinConversationPressed(item)}
                  style={{
                    width: "10em",
                    height: "3em",
                    borderRadius: "0.5em",
                    color: "white",
                    backgroundColor: "green",
                  }}
                >
                  <b>Start Consultation</b>
                </button>
              </div>
              <Link to="/Prescription" className="MarginTop10">
                <button
                  style={{
                    width: "9em",
                    height: "3em",
                    borderRadius: "0.5em",
                    color: "white",
                    backgroundColor: "#3D3DB5",
                  }}
                >
                  <b>Precsription</b>
                </button>
              </Link>
            </div>
          </div>
        );
      })
    ) : (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "150px",
          marginBottom: "100px",
        }}
      >
        <img src={Spinner} alt="Loading" />
      </div>
    );

    return (
      <div className="Appcontainer">
        <Nav />
        <div className="alldept pb15">
          <div className="backarrow">
            {" "}
            <Link to="/Dashboard">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h2>All Appointment</h2>
          {/* Start Date: {this.state.startDate}
        End Date: {this.state.endDate} */}
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <b>Upcoming Appointments on: </b>
            <DatePicker
              disabled={false}
              mode="date"
              selected={this.state.slotDate}
              onChange={(date) => this.handleDatePicker(date)}
              className="datepiccss"
              style={{
                backgroundColor: "blue",
                width: "2em",
              }}
            />
          </div>

          {appointmentdata}
        </div>
      </div>
    );
  }
}

export default Allappointment;
