import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Nav from "./Nav";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ConsentForm extends React.Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");

        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }
        this.state = {
            loggedIn,
            PatientId: "",
            Purpose: "",
            PurposeCode:"",
            nameError: "",
            Infofrom: new Date(),
            infoto: new Date(),
            infotype: [],
            Expiry: new Date(),
            OPIsSelected: false,
            DisIsSelected: false,
            DiagIsSelected: false,
            PresIsSelected: false,
            PatientIdError: "",
            submitted: false,
        };
    }
    componentDidMount = () => {
    this.resetUserInputs();
     };

   

    handleSubmit = (event) => {
        event.preventDefault();
        const {
            infotype,
            OPIsSelected,
            DisIsSelected,
            DiagIsSelected,
            PresIsSelected,
            Infofrom,
            infoto,
            Expiry,
            PurposeCode,
            Purpose,
            PatientId
        } = this.state
      //  const isValid = this.validate();
       // if (isValid) {
            //console.log("we are in handle submit");
        if (OPIsSelected) {
            infotype.push("OPConsultation")
        }
        if (DisIsSelected) {
            infotype.push("DischargeSummary")
        }
        if (DiagIsSelected) {
            infotype.push("DiagnosticReport")
        }
        if (PresIsSelected) {
            infotype.push("Prescription")
        }
        
        
        console.log(JSON.stringify(infotype))
            const payload = {
                id: PatientId,
                text: Purpose,
                code: PurposeCode,
                from: moment(Infofrom).format("YYYY-MM-DDTHH:mm:ss.SSSSSS"),
                to: moment(infoto).format("YYYY-MM-DDTHH:mm:ss.SSSSSS"),
                dataEraseAt: moment(Expiry).format("YYYY-MM-DDTHH:mm:ss.SSSSSS"),
                htype: infotype
        };
        console.log(JSON.stringify(payload))
            // axios({
            //     url: `https://stage.mconnecthealth.com/v1/doctor/`,
            //     method: "POST",
            //     data: payload,
            //     headers: {
            //         Authorization: localStorage.getItem("token"),
            //     },
            // })
            //     .then((response) => {
            //         if (response.data.code === 200) {
            //             alert("Success: " + response.data.message);
            //             console.log("Data has been sent to the server successfully");
            //            // this.resetUserInputs();
            //             this.setState({
            //                 submitted: true,
            //             });
            //         } else {
            //             alert("Error: " + response.data.message);
            //             console.log(response.data.message);
            //         }
            //     })
            //     .catch((Error) => {
            //         if (Error.message === "Network Error") {
            //             alert("Please Check your Internet Connection")
            //             console.log(Error.message)
            //             return;
            //         }
            //         if (Error.response.data.code === 403) {
            //             alert(Error.response.data.message)
            //             console.log(JSON.stringify("Error 403: " + Error.response.data.message))
            //             this.setState({
            //                 loggedIn: false
            //             })

            //         }
            //         else {
            //             alert("Something Went Wrong")
            //         }
            //     });
        //}
    };
    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };

    handleOPConsultation = ({ target }) => {
        console.log(target.checked)        
        this.setState({ OPIsSelected: target.checked });       
    };

    handleDischarge = ({ target }) => {
        console.log(target.checked)
        this.setState({ DisIsSelected: target.checked });      
    };

    handleDiagnostic = ({ target }) => {
        console.log(target.checked)
        this.setState({ DiagIsSelected: target.checked });
    };
    handlePresciption = ({ target }) => {
        console.log(target.checked)
        this.setState({ PresIsSelected: target.checked });
    };

    handleOnChange = (e) => {
        this.setState({
            PurposeCode: e.target.value,
        });
        // if (e.target.value == "CAREMGT") {
        //     this.setState({ Purpose: "Care Management" })
        // }
        // if (e.target.value == "BTG") {
        //     this.setState({ Purpose: "Break the Glass" })
        // }
        // if (e.target.value == "PUBHLTH") {
        //     this.setState({ Purpose: "Public Health" })
        // }
        // if (e.target.value == "HPAYMT") {
        //     this.setState({ Purpose: "Healthcare Payment" })
        // }
        // if (e.target.value == "DSRCH") {
        //     this.setState({ Purpose: "Disease Specific Healthcare Research" })
        // }
        // if (e.target.value == "PATRQT") {
        //     this.setState({ Purpose: "Self Requested" })
        // }
        // else {
        //     this.setState({ Purpose: "" })
        // }
        
    }

    handleInfoTo = (date) => {
        console.log(date);
        this.setState({
            infoto: date,
        });
    };
   
    handleInfoFrom = (date) => {
        console.log(date);
        this.setState({
            Infofrom: date,
        });
    };

    handleExpiry = (date) => {
        console.log(date);
        this.setState({
            Expiry: date,
        });
    };

     resetUserInputs = () => {
        this.setState({
                PatientId: "",
                Purpose: "",
                PurposeCode: "",
                nameError: "",
                Infofrom: new Date(),
                infoto: new Date(),
                infotype: [],
                Expiry: new Date(),
                OPIsSelected: false,
                DisIsSelected: false,
                DiagIsSelected: false,
                PresIsSelected: false,
        });
 };
    render() {
        const {
            infotype,
            OPIsSelected,
            DisIsSelected,
            DiagIsSelected,
            PresIsSelected,
            Infofrom,
            infoto,
            Expiry,
            PurposeCode,
            Purpose,
            PatientId
        } = this.state

        // if (this.state.submitted) {
        //     return <Redirect to="/Myprofile" />;
        // }
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />;
        }
        return (
            <div className='Appcontainer'>
                <Nav />
                <div className="dashboard_wrap">

                    <div className="adddept">
                        <div className="backarrow">
                            {" "}
                            <Link to="/Allappointment">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                        </div>
                        <h2>Consent Request Form</h2>

                        <form
                        onSubmit={this.handleSubmit}
                        >
                            <div className="row">
                                <input
                                    type="text"
                                    name="PatientId"
                                    value={PatientId}
                                    placeholder="Patient Health ID"
                                    onChange={this.handleChange}
                                />
                            </div>
                            

                            <div className="Calendar">
                                <b>Purpose of Request</b>
                                <select onChange={this.handleOnChange}>
                                    <option value="">Select</option>
                                    <option value="CAREMGT">Care Management</option>
                                    <option value="BTG">Break the Glass</option>
                                    <option value="PUBHLTH">Public Health</option>
                                    <option value="HPAYMT">Healthcare Payment</option>
                                    <option value="DSRCH">Disease Specific Healthcare Research</option>
                                    <option value="PATRQT">Self Requested</option>
                                </select>
                            </div>
                      
                            <div className="Calendar">
                                Health Info Form:
                               
                                    <DatePicker
                                        disabled={false}
                                        mode="date"
                                        selected={Infofrom}
                                        onChange={(date) => this.handleInfoFrom(date)}
                                        peekNextMonth
                                        showMonthDropdown
                                    showYearDropdown
                                    maxDate={new Date()}
                                        dropdownMode="select"
                                    dateFormat="MMMM d, yyyy"
                                        className='calenderpicker'
                                    style={{
                                        backgroundColor: "blue",
                                        marginLeft: '6em',
                                        marginBottom: '2em'

                                    }}
className='datepicker'
                                    />

                               
                             
                            </div>

                            <div className="Calendar">
                                Health Info To:
                  <DatePicker
                                    disabled={false}
                                    mode="date"
                                    selected={infoto}
                                    onChange={(date) => this.handleInfoTo(date)}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="MMMM d, yyyy"
                                    dropdownMode="select"
                                    maxDate={new Date()}
                                />
                              
                            </div>

                            <div className="Calendar">
                                Consent Expiry:
                                
                                <DatePicker
                                    disabled={false}
                                    mode="date"
                                    selected={Expiry}
                                    onChange={(date) => this.handleExpiry(date)}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="MMMM d, yyyy"
                                    dropdownMode="select"
                                    showTimeSelect
                                    minDate={new Date()}
                                    
                                    style={{
                                        marginbottom: '1em',
                                    }}
                                />
                               

                            </div>

                            <div className="row"
                                style={{
                                    marginTop: '1em'
                                }}>

                                <b>Health Info Type</b>
                            </div>
                            <div className="row">

                                <input
                                    type="checkbox"
                                    value={OPIsSelected}  
                                    onChange={this.handleOPConsultation} 
                                    className='checkboxcss'
                                    style={{
                                        width: '6em',
                                        justifyContent: 'center',
                                        marginLeft: '3em'
                                    }}
                                />
                                <label
                                    style={{
                                        marginRight: '3em'
                                    }}>
                                    OP Consultation
                                </label>
                                <input
                                     type="checkbox"                                    
                                    value={DiagIsSelected}                                     
                                    onChange={this.handleDiagnostic} 
                                    style={{
                                        width: '6em',
                                        justifyContent: 'center',
                                    }}
                                />
                                <label>
                                    Diagonostic Reports
                                        </label>

                            </div>
                            <div className="row">

                                <input                                   
                                    type="checkbox"                                    
                                    value={DisIsSelected}                                    
                                    onChange={this.handleDischarge} 
                                    style={{
                                        width: '6em',
                                        justifyContent: 'center',
                                        marginLeft: '3em'
                                    }}
                                />
                                <label>
                                    Discharge Summary
                                        </label>
                                <input                                  
                                    type="checkbox"                                   
                                    value={PresIsSelected}                                    
                                    onChange={this.handlePresciption} 
                                    style={{
                                        width: '6em',
                                        justifyContent: 'center',
                                        marginLeft: '3em'
                                    }}
                                />
                                <label>
                                    Prescription
                                        </label>

                            </div>
                            <div className="btncontainer">
                                <button onClick={this.resetUserInputs} className="Updatebtn" type="reset">
                                    <i className="fas fa-check"></i>Reset{" "}
                                </button>
                                <button type="submit" className="Updatebtn">
                                    <i className="fas fa-save"></i>Request Consent
              </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default ConsentForm;
