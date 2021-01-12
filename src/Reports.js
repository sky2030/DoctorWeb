import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import bgimg from "./img/bgimg.jpg";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Spinner from "./img/Spinnergrey.gif";
import Navigation from './Nav';
import moment from "moment-timezone"
//import report from './img/image_report.jpg'

const initialState = {
    advice: "",
    currentPage: 0,
    appointment_id: "",
    date: "",
    patientName: "",
    Report: []
};
let key_prefix = ""

class Reports extends React.Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");

        let LoggedIn = true;
        if (token == null) {
            LoggedIn = false;
        }
        this.state = initialState;
    }

    componentDidMount = async () => {
        //console.log("appointment data from params " + JSON.stringify(this.props.location.Data.item.patient.id))
        key_prefix = ""

        await this.setState({
            key_prefix: "",
            appointment_id: this.props.location.Data.item.id,
            patientName: this.props.location.Data.item.consultant.name

        });
        this.fetchData();


    };
    fetchData = () => {
        let URL = `https://stage.mconnecthealth.com/v1/doctor/report/${this.state.appointment_id}`;
        console.log(URL);
        fetch(URL, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token"),
            },

        })
            .then((res) => res.json())
            .then((results) => {
                console.log(JSON.stringify(results));
                if (results.code == 200) {
                    this.setState({
                        Report: results.data
                    })
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


    render() {
        if (localStorage.getItem("token") == null) {
            return <Redirect to="/" />;
        }
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />;
        }
        const { patientName, Report } = this.state
        // const removeReport = (item) => {

        // }
        // const replaceReport = (item) => {

        // }
        // const renderItem = (item, index) => {
        //     let fileString = ""
        //     if (item.file) {
        //         fileString = `https://stage.mconnecthealth.com/v1/doctor${item.file.url}`
        //     }
        //     const report = item.report_name
        //     const dateOfReport = moment(Number(item.report_date)).format("ll")

        const BASE = "https://stage.mconnecthealth.com";

        const postList = Report.length ? (
            Report.map((post) => {
                let fileString = ""
                if (post.file) {
                    fileString = `${BASE}${post.file.url}`
                }
                const report = post.report_name
                const dateOfReport = moment(Number(post.report_date)).format("ll")
                return (
                    <div style={{
                        width: '50em',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '1em',
                        marginLeft: '4em'

                    }}>
                        <div style={{
                            marginRight: '10em',
                            paddingRight: '4em'
                        }}>
                            <img
                                // src={post.picture === "" ? addicon : post.picture}
                                src={fileString}
                                alt="Report"
                                style={{
                                    width: '20em',
                                    borderWidth: '5px',
                                    color: 'blue',
                                    borderRadius: '10px'

                                }}
                            />
                        </div>
                        <div style={{
                            marginTop: '1.5em',
                            marginLeft: '1em',
                            marginBottom: '1em',
                            paddingBottom: "1em"
                        }}>
                            <b>  {report}</b>
                            <b>  {dateOfReport}</b>
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
                <Navigation />
                <div className="alldept">
                    <div className="backarrow">
                        <Link to="/Allappointment">
                            <i className="fas fa-arrow-left"></i>
                        </Link>{" "}
                    </div>
                    <h2>{patientName} Reports</h2>
                    {postList}

                </div>
            </div>
        );
    }
}
export default Reports;
