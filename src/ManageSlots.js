import React from "react";
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Nav from "./Nav";
import Spinner from "./img/Spinnergrey.gif";

const AVALABLE_COLOR = "#D7F4DC";
const BOOKED_COLOR = "#03b500";
const CANCELED_COLOR = "#de0202";
const IS_AVAILABLE = "available";
const IS_BOOKED = "booked";
const IS_CANCELED = "canceled";
const AVALABLE_FONT = "#000";
const BOOKED_FONT = "#fff";
const CANCELLED_FONT = "#ACB9B7";

class ManageSlots extends React.Component {
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
    fetch(
      `https://stage.mconnecthealth.com/v1/doctor/slots?day_from=${startDate}&day_to=${endDate}`,
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
          //loading(false);
        } else {
          alert(results.message);
        }
      })
      .catch((err) => {
        //setLoading(false);
        alert(err);
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
    return AVALABLE_COLOR;
  };

  displayColor = (item) => {
    if (item == IS_BOOKED) {
      return BOOKED_FONT;
    } else if (item == IS_CANCELED) {
      return CANCELLED_FONT;
    }
    return AVALABLE_FONT;
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
          <Link
            to="/Manageconsulation"
            className="doctor-card col"
            style={{
              backgroundColor: this.displayBGSlot(item.status),
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
              </p>
            </div>
          </Link>
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
              />
            </div>
            <div className="flex-container1">{appointmentdata}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default ManageSlots;
