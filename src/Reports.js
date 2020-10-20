import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import bgimg from "./img/bgimg.jpg";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Nav from './Nav';

class Reports extends React.Component {
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

                <div className="alldept pb15">

                    <div className="backarrow">
                        {" "}
                        <Link to="/Allappointment">
                            <i className="fas fa-arrow-left"></i>
                        </Link>
                    </div>
                    <h2>All Reports</h2>

                </div>
            </div>
        );
    }
}
export default Reports;
