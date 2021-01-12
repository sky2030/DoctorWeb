import React from "react";
import Navigation from "./Nav";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

const initialState = {
  consultation: "",
  ewsfee: "",
  followupdays: "",
  followupfee: "",
  consultationError: "",
  submitted: false,
};

class Adddoctorfee extends React.Component {
  state = initialState;

  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      consultation: "",
      ewsfee: "",
      followupdays: "",
      followupfee: "",
    };
  }

  validate = () => {
    let consultationError = "";

    if (!this.state.consultation) {
      consultationError = "****Consultation Fees cannot be blank";
    }

    if (consultationError) {
      this.setState({ consultationError });
      return false;
    }

    return true;
  };

  componentDidMount = () => {
    console.log(`This is Hospital ID ${this.props.match.params.id}`);
    this.getDoctor();
    //  this.setState({hospital: this.props.match.params});
    //  console.log(`This is Hospital Name ${this.props.match.params.hospitalname}`)
  };

  getDoctor = () => {
    axios
      .get(
        `https://stage.mconnecthealth.com/v1/doctor`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        this.setState({
          consultation: data.consultation_fee,
          ewsfee: data.ews_fee,
          followupdays: data.followupdays,
          followupfee: data.followupfee,
          id: data._id,
        });
        console.log("Data has been received!!");
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


  handleSubmit = (event) => {
    event.preventDefault();
    // const isValid = this.validate();
    // if (isValid) {
    const payload = {
      consultation: this.state.consultation,
      ewsfee: this.state.ewsfee,
      followupdays: this.state.followupdays,
      followupfee: this.state.followupfee,
    };
    const isValid = this.validate();
    if (isValid) {
      axios({
        url: `https://stage.mconnecthealth.com/v1/doctor/fees`,
        method: "PUT",
        data: payload,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.code === 200) {
            alert(response.data.message)
            console.log("Data has been sent to the server successfully");
            this.resetUserInputs();
            this.setState({
              submitted: true,
            });
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
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  resetUserInputs = () => {
    this.setState(initialState);

  };
  render() {
    const {
      consultation,
      ewsfee,
      followupdays,
      followupfee,
      consultationError,
      submitted,
    } = this.state;

    if (submitted) {
      return <Redirect to="/Myprofile" />;
    }
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Appcontainer">
        <Navigation />
        <div className="adddept">
          <div className="backarrow">
            {" "}
            <Link to="/Myprofile">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h2>Add Doctor Fee</h2>

          <form action="confirm" onSubmit={this.handleSubmit}>
            <div className="row">
              <input
                type="text"
                placeholder="Consultation Fee"
                value={consultation}
                name="consultation"
                onChange={this.handleChange}
              />

            </div>
            <div style={{ fontSize: 12, color: "red" }}>
              {consultationError}
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="EWS Fees"
                value={ewsfee}
                name="ewsfee"
                onChange={this.handleChange}
              />

            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Follow Up Day"
                value={followupdays}
                name="followupdays"
                onChange={this.handleChange}
              />

            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Followup Fees"
                value={followupfee}
                name="followupfee"
                onChange={this.handleChange}
              />

            </div>

            <div className="btncontainer">
              <button type="submit" className="Updatebtn">
                {" "}
                <i className="fas fa-save"></i> Save{" "}
              </button>
              <button onClick={this.resetUserInputs} className="Updatebtn" type="reset">
                <i className="fas fa-save"></i>Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Adddoctorfee;
