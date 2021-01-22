import React from "react";
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Nav from "./Nav";
import axios from "axios";
import Spinner from "./img/Spinnergrey.gif";

const AVALABLE_COLOR = "#D7F4DC";
const BOOKED_COLOR = "#03b500";
const CANCELED_COLOR = "#de0202";
const COMPLETED_COLOR = "#015711";
const IS_AVAILABLE = "available";
const IS_BOOKED = "booked";
const IS_CANCELED = "cancelled";
const IS_COMPLETED = "completed";
const AVALABLE_FONT = "#000";
const BOOKED_FONT = "#fff";
const CANCELLED_FONT = "#ACB9B7";
const COMPLETED_FONT = "#fff";

class ManageSlots extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }


    let startDate = moment().startOf("day").format("x");
    let endDate = moment().endOf("day").format("x");


    this.state = {
      email: "",
      password: "",
      token: "",
      loggedIn,
      startDate: startDate,
      endDate: endDate,
      slotDate: new Date(),
      submitted: false,
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
    const { startDate, endDate } = this.state;

    console.log(`this is start date ${startDate}`);
    console.log(`this is start date ${endDate}`);
    let URL = `https://stage.mconnecthealth.com/v1/doctor/slots?day_from=${startDate}&day_to=${endDate}`
    // fetch(
    //   `https://stage.mconnecthealth.com/v1/doctor/slots?day_from=${startDate}&day_to=${endDate}`,
    //   {
    //     method: "Get",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: localStorage.getItem("token"),
    //     },
    //   }
    // )
    //   .then((res) => res.json())
    axios
      .get(URL,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((results) => {
        console.log(JSON.stringify(results));
        if (results.data.code === 200) {
          this.setState({
            appointmentList: results.data.data,
          });
          //loading(false);
        } else {
          alert(results.message);
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

  displayBGSlot = (item) => {
    if (item == IS_BOOKED) {
      return BOOKED_COLOR;
    } else if (item == IS_CANCELED) {
      return CANCELED_COLOR;
    }
    else if (item == IS_COMPLETED) {
      return COMPLETED_COLOR;
    }
    return AVALABLE_COLOR;
  };

  displayColor = (item) => {
    if (item == IS_BOOKED) {
      return BOOKED_FONT;
    } else if (item == IS_CANCELED) {
      return CANCELLED_FONT;
    }
    else if (item == IS_COMPLETED) {
      return COMPLETED_FONT;
    }
    return AVALABLE_FONT;
  };

  deleteAll = () => {
    const { startDate, endDate } = this.state;
    let URL = `https://stage.mconnecthealth.com/v1/doctor/appointment/cancelled`;
    let payLoad = {
      from_millis: startDate,
      to_millis: endDate,
    }
    fetch(URL, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        if (results.code != 200) {
          alert(results.message);
        } else {
          alert(results.message);
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
  deleteAppointment = (id) => {
    let URL = `https://stage.mconnecthealth.com/v1/doctor/appointment/cancelled`;
    let payLoad = {
      appointment_id: id,
    }
    fetch(URL, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        alert(results.message);
        if (results.code == 200) {
          this.fetchData();
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

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    if (localStorage.getItem("token") == null) {
      return <Redirect to="/" />;
    }


    const { appointmentList, slotDate } = this.state;
    const appointmentdata = appointmentList.length ? (
      appointmentList.map((item) => {
        return (
          <div

            className="doctor-card col"
            style={{
              backgroundColor: this.displayBGSlot(item.status),
              pointerEvents: "painted"
            }}
          >
            <div className="bodytext">
              <p
                className="slotalign"
                style={{
                  color: this.displayColor(item.status),
                  marginTop: "2px",
                }}
              >
                {moment(item.day_millis).format("ll")}{" "}
              </p>
              {item.status === "booked" ?
                <p
                  className="slotalign"
                  style={{
                    color: this.displayColor(item.status),
                    marginTop: "2px",
                  }}
                >
                  {item.patient.name}
                </p>
                : null}
              <p
                className="slotalign1"
                style={{
                  color: this.displayColor(item.status),
                }}
              >
                {this.StringFromTime(item.time_millis)}


              </p>
              <p
                style={{
                  color: "Black",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {item.status.toUpperCase()}
                <i
                  onClick={() => this.deleteAppointment(item.id)}
                  className="fas fa-trash"
                  style={{
                    cursor: "pointer",
                    fontSize: "15px",
                    marginLeft: '10px',
                    marginBottom: '5px'
                  }}></i>
              </p>


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

        <div className="dashboard_wrap">
          <div className="allmanage pb15">
            <div className="backarrow1">
              {" "}
              <Link to="/Dashboard">
                <i className="fas fa-arrow-left"></i>
              </Link>
            </div>
            <h2>Manage Slots</h2>
            <div
              style={{
                marginTop: "10px",
              }}
            >
              <b>Slots on: </b>
              <DatePicker
                disabled={false}
                mode="date"
                selected={this.state.slotDate}
                onChange={(date) => this.handleDatePicker(date)}
                className="datepiccss"
              /> <i className="fa fa-calendar" aria-hidden="true" style={{
                marginTop: '1px'
              }}></i>
            </div>
            <Link to="/Manageconsulation" className="btnPanel">
              <button><i class="fas fa-plus-square"></i></button>
                        Add Slots
                    </Link>

            <div className="flex-container1">{appointmentdata}</div>
            {appointmentList.length > 1 ?
              <button
                onClick={this.deleteAll}
                className="Cancelbtn"> Cancel All for {moment(slotDate).format("ll")}
              </button> : null}

          </div>

        </div>
      </div>
    );
  }
}
export default ManageSlots;
