import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import contactImg from "./img/contact2.jpg";
import { Redirect } from "react-router-dom";
import Nav from "./Nav";
//import { Link } from 'react-router-dom';

class Myhospital extends React.Component {
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
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div Appcontainer>
        <Nav />

        <div className="dashboard_wrap2">

          <div className="contact-banner">
            <img
              // style={{
              //   width: "95%",
              //   borderRadius: "10px",
              //   marginTop: "20px",
              // }}
              src={contactImg}
              alt="Contact_img"
            />
          </div>
          <div className="flex-container scroll">
            <div className="col4 box-shad"
            // style={{
            //   height: '42vh'
            // }}
            >
              {/* <h3>Apollo Hospital</h3>{" "}
                <p>
                  <i className="far fa-envelope"></i> support@apollohospital.com{" "}
                </p>{" "}
                <p>
                  <i className="fas fa-phone-alt"></i> 120-34232334{" "}
                </p>
                <h3>Emergency Helpline</h3>{" "}
                <p>
                  <i className="far fa-envelope"></i> emergency@apollohospital.com{" "}
                </p>{" "}
                <p>
                  <i className="fas fa-phone-alt"></i> 120-34232334{" "}
                </p> */}
              <h3>Application Support</h3>{" "}
              <p>
                <i className="far fa-envelope">
                </i> vrcure@smhs.motherson.com{" "}
              </p>{" "}
              <p>
                <i className="fas fa-phone-alt">
                </i> 0120-4365125{" "}
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default Myhospital;
