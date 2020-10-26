import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link, Redirect } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <Link to="/PrivacyPage">
        <footer>
          <p> SMHS. © 2019 - 2020. All Rights Reserved. </p>
        </footer>
      </Link>
    );
  }
}

export default Footer;
