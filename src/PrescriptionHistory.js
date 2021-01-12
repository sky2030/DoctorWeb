import React from "react";
import "./dashboard/dashboard.css";
import { Redirect } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import moment from "moment-timezone";

const initialState = {
    submitted: false,
    advice: "",
    special_advice: "N/A",
    appointment: "N/A",
    symptoms: "N/A",
    findings: "N/A",
    fileString: "",
    patientName: "N/A",
    patientWeight: "N/A",
    patientAge: "N/A",
    patientHeight: "N/A",
    patientGender: "N/A",
    suggestedInvestigation: "N/A",
    ageError: "",
    genderError: "",
    heightError: "",
    weightError: "",
    lengthError: "",
    date: "",
    hospitalName: "",
    Place: "",
    City: "",
    PinCode: "",
    DoctorName: "",
    Degree: "",
    Designation: "",
    District: "",
    State: "",
    Landmark: "",
    report: ""
};



class PrescriptionCom extends React.Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");

        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }
        this.state = initialState;

    }

    componentDidMount = () => {
        console.log(`This is Patient ID `, JSON.stringify(this.props.location.Data.item.patient.id));
        this.getPatient();
        //  this.setState({hospital: this.props.match.params});
        //  console.log(`This is Hospital Name ${this.props.match.params.hospitalname}`)
    };

    getPatient = () => {
        //  axios.get('/v1/admin/hospitals/'+`?hospitalcode=${this.props.match.params.id}&doctorName=Sanjeev`,
        axios
            .get(
                "https://stage.mconnecthealth.com/v1/doctor/prescription?patient_id=" +
                this.props.location.Data.item.patient.id,
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            // axios.get('https://stage.mconnecthealth.com/saket_Hospital')
            .then((response) => {
                console.log("This is Prescription " + JSON.stringify(response));
                if (response.data.code == 200) {
                    const data = response.data.data;
                    this.setState({ post: data });
                    console.log("Data has been received!!");
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
    };
    render() {
        if (localStorage.getItem("token") == null) {
            return <Redirect to="/" />;
        }
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />;
        }

        const { patientName, patientGender, patientWeight,
            patientAge, patientHeight, symptoms, advice, date,
            findings, suggestedInvestigation, special_advice,
            hospitalName, Place, City, District, Landmark, PinCode,
            DoctorName, Degree, Designation, State, fileString } = this.state
        return (
            <div className="Appcontainer">
                <Nav />
                <div className="prescription_wrap">
                    {/* <button
                        style={{
                            width: "6em",
                            height: "2em",
                            fontWeight: "bold",
                            fontSize: "1em",
                            color: "white",
                            borderColor: "#2E5293",
                            backgroundColor: '#2E5293',
                            position: 'fixed',
                            right: '2vw',
                            marginTop: '10em'

                        }}
                        type='submit' onClick={this.uploadPrescription}>
                        <i className="fas fa-save"></i> Submit
            </button> */}
                    <div className="container">
                        <div className="header1">
                            <h2>{hospitalName}</h2>
                            <p>{DoctorName} | {Degree}</p>
                            <p>{Designation}</p>
                            <p>{Place}, {Landmark}, {District} </p>
                            <p>{City}, {State}, {PinCode} </p>
                        </div>
                        <div className="form-container">
                            {/* <form
                                style={{
                                    height: "50vh",
                                }}
                            > */}
                            <div className="row">
                                <div className="bodybox">
                                    <div className="form-row">
                                        <label>Date of consultation: </label>
                                        <label style={{
                                            fontWeight: 'bold'
                                        }}>{moment(date).format("ll")}</label>

                                    </div>
                                    <div className="form-row">
                                        <label>Name of Patient</label>
                                        <label style={{
                                            fontWeight: 'bold'
                                        }}>{patientName}</label>

                                    </div>

                                </div>
                                <div className="bodybox">
                                    <div className="form-row age"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}>

                                        {/* <div className="form-row" >
                                            <b>Age</b>

                                            <p>{patientAge}</p>
                                        </div> */}
                                        <div className="form-row">
                                            <label>Age</label>
                                            <label style={{
                                                fontWeight: 'bold'
                                            }}>{patientAge}</label>

                                        </div>


                                        <div className="form-row">
                                            <label>Gender</label>
                                            <label style={{
                                                fontWeight: 'bold'
                                            }}>{patientGender}</label>

                                        </div>

                                    </div>
                                    <div className="form-row age"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}>
                                        <div className="form-row">
                                            <label>Height</label>
                                            <label style={{
                                                fontWeight: 'bold'
                                            }}>{patientHeight}</label>

                                        </div>
                                        <div className="form-row">
                                            <label>Weight</label>
                                            <label style={{
                                                fontWeight: 'bold'
                                            }}>{patientWeight}</label>

                                        </div>
                                    </div>

                                </div>

                            </div>
                            {/* </form> */}
                        </div>
                        <div className="border-top"></div>
                        <div className="tablecontent">
                            <div className="row">
                                <div className="col4">
                                    <h3>Chief Complaints</h3>

                                    <div>
                                        {symptoms}
                                    </div>


                                    <h3>Lab Finding</h3>
                                    <div>
                                        {symptoms}
                                    </div>

                                    <h3>Suggested Investigation</h3>
                                    <div className="spcins">
                                        {suggestedInvestigation}
                                    </div>



                                </div>
                                <div className="col6">
                                    <h3>Diagnose Or Provisional Diagnosis</h3>
                                    <div className="spcins">
                                        {advice}
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="border-bottom"></div>
                        <div className="spnotification">
                            <p>Special Instructions</p>
                            <div className="spcins">
                                {special_advice}
                            </div>

                        </div>
                        <div className="stampsign">
                            <p>RMPs Signature & Stamp</p>
                        </div>


                    </div>
                </div>

                {/* <div style={{ marginBottom: '3em' }}>
                    <label style={{ marginRight: '1em' }}>Add file if any </label>
                    <input
                        type="file"
                        className="uploadbox"
                        name="file"
                        accept=".jpeg, .png, .jpg"
                        onChange={this.onChangeHandler}
                    />
                </div> */}


            </div>

        );
    }
}
export default PrescriptionCom;
