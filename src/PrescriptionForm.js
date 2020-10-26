import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import bgimg from "./img/bgimg.jpg";
//import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import moment from "moment-timezone";

const initialState = {
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
    Landmark: ""
};



class Prescription extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;

    }

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener("focus", async () => {
    //         console.log("Appointment :", JSON.stringify(route.params.item));
    //         setAppointment(route.params.item);
    //         setdoctorAdvice("");
    //         setSpecial(NA);
    //         setSymptoms(NA);
    //         setFindings(NA);
    //         setFilestring("");
    //         setSuggestedInvestigation(NA);

    //         setPatientName(
    //             route.params.item.patient ? route.params.item.patient.name : ""
    //         );
    //         setPatientWeight(
    //             route.params.item.weight != undefined
    //                 ? route.params.item.patient.weight
    //                 : NA
    //         );
    //         setPatientAge(
    //             route.params.item.age != undefined ? route.params.item.patient.age : NA
    //         );
    //         setPatientheight(
    //             route.params.item.height != undefined
    //                 ? route.params.item.patient.height
    //                 : NA
    //         );
    //         setPatientGender(
    //             route.params.item.gender != undefined
    //                 ? route.params.item.patient.gender
    //                 : "MALE"
    //         );
    //     });
    //     return unsubscribe;
    // }, [route.params]);

    componentDidMount = () => {
        console.log("appointment data from params " + JSON.stringify(this.props.location.Data))
        this.setState({
            advice: "",
            special_advice: "N/A",
            appointment: this.props.location.Data.item.id,
            symptoms: "N/A",
            findings: "N/A",
            fileString: "",
            patientName: this.props.location.Data.item.consultant.name,
            patientWeight: this.props.location.Data.item.consultant.weight,
            patientAge: this.props.location.Data.item.consultant.age,
            patientHeight: this.props.location.Data.item.consultant.height,
            patientGender: this.props.location.Data.item.consultant.gender,
            suggestedInvestigation: "N/A",
            date: this.props.location.Data.item.day_millis,
            hospitalName: this.props.location.Data.item.hospital.name,
            Place: this.props.location.Data.item.hospital.place,
            City: this.props.location.Data.item.hospital.city,
            District: this.props.location.Data.item.hospital.district,
            State: this.props.location.Data.item.hospital.state,
            Landmark: this.props.location.Data.item.hospital.landmark,
            PinCode: this.props.location.Data.item.hospital.pincode,
            DoctorName: this.props.location.Data.item.doctor.name,
            Degree: this.props.location.Data.item.doctor.degree,
            Designation: this.props.location.Data.item.doctor.designation


        });
        this.setState({
            posts: this.props.location.Data.item,
        });
    };

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };

    // retnum = (str) => {
    //     var num = str.replace(/[^0-9]/g, "");
    //     return parseInt(num, 10);
    // };


    uploadPrescription = (event) => {
        console.log("upload completed")
        event.preventDefault();
        //const userToken = await AsyncStorage.getItem("userToken");
        const { patientName, patientGender, patientWeight,
            patientAge, patientHeight, symptoms, advice, date,
            findings, suggestedInvestigation, special_advice, appointment, fileString,
        } = this.state
        let URL = `https://stage.mconnecthealth.com/v1/doctor/prescription`;

        if (patientName.length <= 0) {
            alert("Please fill the patient name");
            return;
        }
        if (patientGender == "N/A") {
            alert("Please fill the patient gender.");
            return;
        }
        if (patientWeight == "N/A") {
            alert("Please fill the patient weight.");
            return;
        }
        if (patientAge == "N/A") {
            alert("Please fill the patient age.");
            return;
        }
        if (patientHeight == "N/A") {
            alert("Please fill the patient height.");
            return;
        }
        if (symptoms.length <= 0) {
            alert("Please fill the symptoms.");
            return;
        }
        if (advice.length <= 0) {
            alert("Please fill the prescription body.");
            return;
        }

        let payload = {
            appointment_id: appointment,
            symptoms: symptoms,
            advice: advice,
            special_advice: special_advice,
            report: fileString,
            lab_findings: findings,
            suggested_investigation: suggestedInvestigation,
            name: patientName,
            gender: patientGender,
            age: patientAge,
            height: patientHeight,
            weight: patientWeight,
        };
        console.log(URL, JSON.stringify(payload));
        axios.post(URL, {
            headers: {
                Authorization: localStorage.getItem("token")
            },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((results) => {
                console.log(JSON.stringify(results));

                if (results.code == 200) {
                    // navigation.goBack();
                    //const data = results.data.data;
                    //this.setState({ hospitals: data });
                    //console.log("Data has been received!!");
                    alert(results.message)
                } else {
                    alert(results.message);
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    handleAge = (e) => {
        this.setState({
            patientAge: e.target.value,
        });
    };

    handleGender = (e) => {
        this.setState({
            patientGender: e.target.value,
        });
    };

    handleHeight = (e) => {
        this.setState({
            patientHeight: e.target.value,
        });
    };

    handleWeight = (e) => {
        this.setState({
            patientWeight: e.target.value,
        });
    };

    // handleLength = (e) => {
    //     this.setState({
    //         length: e.target.value,
    //     });
    // };


    onChangeHandler = (event) => {
        console.log("file to upload:", event.target.files[0]);

        this.getBase64(event.target.files[0], (result) => {
            this.setState({
                picture: result,
            });
            console.log(result);
        });

        // let file = event.target.files[0];

        // if (file) {
        //   const reader = new FileReader();

        //   reader.onload = this._handleReaderLoaded.bind(this);
        //   reader.readAsBinaryString(file);
        // }
    };

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    }

    //   this.getBase64(idCard, (result) => {
    //      idCardBase64 = result;
    // });

    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result;
        this.setState({
            picture: btoa(binaryString),
        });
    };


    handleUpload = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("file", this.state.selectedFile);
        data.append("upload_preset", "skyMedi");
        data.append("cloud_name", "skycloud55");

        fetch("https://api.cloudinary.com/v1_1/skycloud55/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.url);
                this.setState({
                    picture: data.url,
                });
                console.log(this.state.picture);
            })
            .catch((err) => {
                console.log("error while uploading" + err);
            });
    };

    resetUserInputs = () => {
        this.setState(initialState);
        // this.setState({
        //   hospitalname:'',
        //   code:'',
        //   email:'',
        //   phone:'',
        //   picture:'',
        //   place:'',
        //   Landmark:'',
        //   District:'',
        //   city:'',
        //   state:'',
        //   pincode:''
        // });
    };


    render() {
        if (localStorage.getItem("token") == null) {
            return <Redirect to="/" />;
        }
        const { patientName, patientGender, patientWeight,
            patientAge, patientHeight, symptoms, advice, date,
            findings, suggestedInvestigation, special_advice,
            hospitalName, Place, City, District, Landmark, PinCode,
            DoctorName, Degree, Designation, State } = this.state
        return (
            <div className="Appcontainer">
                <Nav />
                <div className="prescription_wrap">
                    <div className="container">
                        <div className="header">
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
                                <div className="col5">
                                    <div className="form-row">
                                        <label>Date of consultation</label>
                                        <input type="text" value={moment(date).format("ll")} style={{
                                            paddingLeft: '1em'
                                        }} />
                                    </div>
                                    <div className="form-row">
                                        <label>Name of Patient</label>
                                        <input type="text"
                                            value={patientName} style={{
                                                paddingLeft: '1em'
                                            }} />
                                    </div>
                                    <div className="form-row">
                                        <label>Address</label>
                                        <textarea className="ht128"></textarea>
                                    </div>
                                </div>
                                <div className="col5">
                                    <div className="form-row age">
                                        <label>Age</label>
                                        {/* <b>{patientAge}</b> */}
                                        <select
                                            onChange={this.handleAge} >
                                            <option value="N/A">N/A</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10" >10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="9">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                            <option value="32">32</option>
                                            <option value="33">33</option>
                                            <option value="34">34</option>
                                            <option value="35">35</option>
                                            <option value="36">36</option>
                                            <option value="37">37</option>
                                            <option value="38">38</option>
                                            <option value="39">39</option>
                                            <option value="40">40</option>
                                            <option value="41">41</option>
                                            <option value="42">42</option>
                                            <option value="43">43</option>
                                            <option value="44">44</option>
                                            <option value="45">45</option>
                                            <option value="46">46</option>
                                            <option value="47"> 47</option>
                                            <option value="48">48</option>
                                            <option value="49">49</option>
                                            <option value="50">50</option>
                                            <option value="51">51</option>
                                            <option value="52">52</option>
                                            <option value="53">53</option>
                                            <option value="54">54</option>
                                            <option value="55">55</option>
                                            <option value="56">56</option>
                                            <option value="57">57</option>
                                            <option value="58">58</option>
                                            <option value="59">59</option>
                                            <option value="60">60</option>
                                            <option value="61">61</option>
                                            <option value="62">62</option>
                                            <option value="63">63</option>
                                            <option value="64">64</option>
                                            <option value="65">65</option>
                                            <option value="66">66</option>
                                            <option value="67">67</option>
                                            <option value="68">68</option>
                                            <option value="69">69</option>
                                            <option value="70">70</option>
                                            <option value="71">71</option>
                                            <option value="72">72</option>
                                            <option value="73">73</option>
                                            <option value="74">74</option>
                                            <option value="75">75</option>
                                            <option value="76">76</option>
                                            <option value="77">77</option>
                                            <option value="78">78</option>
                                            <option value="79">79</option>
                                            <option value="80">80</option>
                                            <option value="81">81</option>
                                            <option value="82">82</option>
                                            <option value="83">83</option>
                                            <option value="84">84</option>
                                            <option value="85">85</option>
                                            <option value="86">86</option>
                                            <option value="87">87</option>
                                            <option value="88">88</option>
                                            <option value="89">89</option>
                                            <option value="90">90</option>
                                            <option value="91">91</option>
                                            <option value="92">92</option>
                                            <option value="93">93</option>
                                            <option value="94">94</option>
                                            <option value="95">95</option>
                                            <option value="96">96</option>
                                            <option value="97">97</option>
                                            <option value="98">98</option>
                                            <option value="99">99</option>
                                            <option value="100">100</option>
                                        </select>
                                        <label>Gender</label>
                                        {/* <b>{patientGender}</b> */}
                                        <select
                                            onChange={this.handleGender}>
                                            <option value="N/A"> Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-row age">
                                        <label>Height</label>
                                        {/* <b>{patientHeight}</b> */}
                                        <select
                                            onChange={this.handleHeight}>
                                            <option value="N/A">N/A</option>
                                            <option value="30 cm">30 cm</option>
                                            <option value="31 cm">31 cm</option>
                                            <option value="32 cm">32 cm</option>
                                            <option value="33 cm">33 cm</option>
                                            <option value="34 cm">34 cm</option>
                                            <option value="35 cm">35 cm</option>
                                            <option value="36 cm">36 cm</option>
                                            <option value="37 cm">37 cm</option>
                                            <option value="38 cm">38 cm</option>
                                            <option value="39 cm">39 cm</option>
                                            <option value="40 cm">40 cm</option>
                                            <option value="41 cm">41 cm</option>
                                            <option value="42 cm">42 cm</option>
                                            <option value="43 cm">43 cm</option>
                                            <option value="44 cm">44 cm</option>
                                            <option value="45 cm">45 cm</option>
                                            <option value="46 cm">46 cm</option>
                                            <option value="47 cm"> 47 cm</option>
                                            <option value="48 cm">48 cm</option>
                                            <option value="49 cm">49 cm</option>
                                            <option value="50 cm">50 cm</option>
                                            <option value="51 cm">51 cm</option>
                                            <option value="52 cm">52 cm</option>
                                            <option value="53 cm">53 cm</option>
                                            <option value="54 cm">54 cm</option>
                                            <option value="55 cm">55 cm</option>
                                            <option value="56 cm">56 cm</option>
                                            <option value="57 cm">57 cm</option>
                                            <option value="58 cm">58 cm</option>
                                            <option value="59 cm">59 cm</option>
                                            <option value="60 cm">60 cm</option>
                                            <option value="61 cm">61 cm</option>
                                            <option value="62 cm">62 cm</option>
                                            <option value="63 cm">63 cm</option>
                                            <option value="64 cm">64 cm</option>
                                            <option value="65 cm">65 cm</option>
                                            <option value="66 cm">66 cm</option>
                                            <option value="67 cm">67 cm</option>
                                            <option value="68 cm">68 cm</option>
                                            <option value="69 cm">69 cm</option>
                                            <option value="70 cm">70 cm</option>
                                            <option value="71 cm">71 cm</option>
                                            <option value="72 cm">72 cm</option>
                                            <option value="73 cm">73 cm</option>
                                            <option value="74 cm">74 cm</option>
                                            <option value="75 cm">75 cm</option>
                                            <option value="76 cm">76 cm</option>
                                            <option value="77 cm">77 cm</option>
                                            <option value="78 cm">78 cm</option>
                                            <option value="79 cm">79 cm</option>
                                            <option value="80 cm">80 cm</option>
                                            <option value="81 cm">81 cm</option>
                                            <option value="82 cm">82 cm</option>
                                            <option value="83 cm">83 cm</option>
                                            <option value="84 cm">84 cm</option>
                                            <option value="85 cm">85 cm</option>
                                            <option value="86 cm">86 cm</option>
                                            <option value="87 cm">87 cm</option>
                                            <option value="88 cm">88 cm</option>
                                            <option value="89 cm">89 cm</option>
                                            <option value="90 cm">90 cm</option>
                                            <option value="91 cm">91 cm</option>
                                            <option value="92 cm">92 cm</option>
                                            <option value="93 cm">93 cm</option>
                                            <option value="94 cm">94 cm</option>
                                            <option value="95 cm">95 cm</option>
                                            <option value="96 cm">96 cm</option>
                                            <option value="97 cm">97 cm</option>
                                            <option value="98 cm">98 cm</option>
                                            <option value="99 cm">99 cm</option>
                                            <option value="100 cm">100 cm</option>
                                            <option value="101 cm">101 cm</option>
                                            <option value="102 cm">102 cm</option>
                                            <option value="103 cm" >103 cm</option>
                                            <option value="104 cm">104 cm</option>
                                            <option value="105 cm">105 cm</option>
                                            <option value="106 cm">106 cm</option>
                                            <option value="107 cm">107 cm</option>
                                            <option value="108 cm">108 cm</option>
                                            <option value="109 cm">109 cm</option>
                                            <option value="110 cm">110 cm</option>
                                            <option value="111 cm">111 cm</option>
                                            <option value="112 cm">112 cm</option>
                                            <option value="113 cm">113 cm</option>
                                            <option value="114 cm">114 cm</option>
                                            <option value="115 cm">115 cm</option>
                                            <option value="116 cm">116 cm</option>
                                            <option value="117 cm">117 cm</option>
                                            <option value="118 cm">118 cm</option>
                                            <option value="119 cm">119 cm</option>
                                            <option value="120 cm">120 cm</option>
                                            <option value="121 cm">121 cm</option>
                                            <option value="122 cm">122 cm</option>
                                            <option value="123 cm">123 cm</option>
                                            <option value="124 cm">124 cm</option>
                                            <option value="125 cm"> 125 cm</option>
                                            <option value="126 cm">126 cm</option>
                                            <option value="127 cm">127 cm</option>
                                            <option value="128 cm">128 cm</option>
                                            <option value="129 cm">129 cm</option>
                                            <option value="130 cm">130 cm</option>
                                            <option value="131 cm">131 cm</option>
                                            <option value="132 cm">132 cm</option>
                                            <option value="133 cm">133 cm</option>
                                            <option value="134 cm">134 cm</option>
                                            <option value="135 cm">135 cm</option>
                                            <option value="136 cm">136 cm</option>
                                            <option value="137 cm">137 cm</option>
                                            <option value="138 cm">138 cm</option>
                                            <option value="139 cm">139 cm</option>
                                            <option value="140 cm">140 cm</option>
                                            <option value="141 cm">141 cm</option>
                                            <option value="142 cm">142 cm</option>
                                            <option value="143 cm">143 cm</option>
                                            <option value="144 cm">144 cm</option>
                                            <option value="145 cm">145 cm</option>
                                            <option value="146 cm">146 cm</option>
                                            <option value="147 cm">147 cm</option>
                                            <option value="148 cm">148 cm</option>
                                            <option value="149 cm">149 cm</option>
                                            <option value="150 cm">150 cm</option>
                                            <option value="151 cm">151 cm</option>
                                            <option value="152 cm">152 cm</option>
                                            <option value="153 cm">153 cm</option>
                                            <option value="154 cm">154 cm</option>
                                            <option value="155 cm">155 cm</option>
                                            <option value="156 cm">156 cm</option>
                                            <option value="157 cm">157 cm</option>
                                            <option value="158 cm">158 cm</option>
                                            <option value="159 cm">159 cm</option>
                                            <option value="160 cm">160 cm</option>
                                            <option value="161 cm">161 cm</option>
                                            <option value="162 cm">162 cm</option>
                                            <option value="163 cm">163 cm</option>
                                            <option value="164 cm">164 cm</option>
                                            <option value="165 cm">165 cm</option>
                                            <option value="166 cm">166 cm</option>
                                            <option value="167 cm">167 cm</option>
                                            <option value="168 cm">168 cm</option>
                                            <option value="169 cm">169 cm</option>
                                            <option value="170 cm">170 cm</option>
                                            <option value="171 cm">171 cm</option>
                                            <option value="172 cm">172 cm</option>
                                            <option value="173 cm">173 cm</option>
                                            <option value="174 cm">174 cm</option>
                                            <option value="175 cm">175 cm</option>
                                            <option value="176 cm">176 cm</option>
                                            <option value="177 cm">177 cm</option>
                                            <option value="178 cm">178 cm</option>
                                            <option value="179 cm">179 cm</option>
                                            <option value="180 cm">180 cm</option>
                                            <option value="181 cm">181 cm</option>
                                            <option value="182 cm">182 cm</option>
                                            <option value="183 cm">183 cm</option>
                                            <option value="184 cm">184 cm</option>
                                            <option value="185 cm">185 cm</option>
                                            <option value="186 cm">186 cm</option>
                                            <option value="187 cm">187 cm</option>
                                            <option value="188 cm">188 cm</option>
                                            <option value="189 cm">189 cm</option>
                                            <option value="190 cm">190 cm</option>
                                            <option value="191 cm">191 cm</option>
                                            <option value="192 cm">192 cm</option>
                                            <option value="193 cm">193 cm</option>
                                            <option value="194 cm">194 cm</option>
                                            <option value="195 cm">195 cm</option>
                                            <option value="196 cm">196 cm</option>
                                            <option value="197 cm">197 cm</option>
                                            <option value="198 cm">198 cm</option>
                                            <option value="199 cm">199 cm</option>
                                            <option value="200 cm">200 cm</option>
                                            <option value="201 cm">201 cm</option>
                                            <option value="202 cm">202 cm</option>
                                            <option value="203 cm">203 cm</option>
                                            <option value="204 cm">204 cm</option>
                                            <option value="205 cm">205 cm</option>
                                            <option value="206 cm">206 cm</option>
                                            <option value="207 cm">207 cm</option>
                                            <option value="208 cm">208 cm</option>
                                            <option value="209 cm">209 cm</option>
                                            <option value="210 cm">210 cm</option>
                                            <option value="211 cm">211 cm</option>
                                            <option value="212 cm">212 cm</option>
                                            <option value="213 cm">213 cm</option>
                                            <option value="214 cm">214 cm</option>
                                            <option value="215 cm">215 cm</option>
                                            <option value="216 cm">216 cm</option>
                                            <option value="217 cm">217 cm</option>
                                            <option value="218 cm">218 cm</option>
                                            <option value="219 cm">219 cm</option>
                                            <option value="220 cm">220 cm</option>
                                            <option value="221 cm"> 221 cm</option>
                                            <option value="222 cm">222 cm</option>
                                            <option value="223 cm">223 cm</option>
                                            <option value="224 cm">224 cm</option>
                                            <option value="225 cm">225 cm</option>
                                            <option value="226 cm">226 cm</option>
                                            <option value="227 cm">227 cm</option>
                                            <option value="228 cm">228 cm</option>
                                            <option value="229 cm">229 cm</option>
                                        </select>
                                        <label>weight</label>
                                        {/* <b>{patientWeight}</b> */}
                                        <select
                                            onChange={this.handleWeight}>
                                            <option value="N/A">N/A</option>
                                            <option value="1 kg">1 kg</option>
                                            <option value="2 kg">2 kg</option>
                                            <option value="3 kg">3 kg</option>
                                            <option value="4 kg">4 kg</option>
                                            <option value="5 kg">5 kg</option>
                                            <option value="6 kg">6 kg</option>
                                            <option value="7 kg">7 kg</option>
                                            <option value="8 kg">8 kg</option>
                                            <option value="9 kg">9 kg</option>
                                            <option value="10 kg" >10 kg</option>
                                            <option value="11 kg">11 kg</option>
                                            <option value="12 kg">12 kg</option>
                                            <option value="13 kg">13 kg</option>
                                            <option value="14 kg">14 kg</option>
                                            <option value="15 kg">15 kg</option>
                                            <option value="16 kg">16 kg</option>
                                            <option value="17 kg">17 kg</option>
                                            <option value="18 kg">18 kg</option>
                                            <option value="19 kg">19 kg</option>
                                            <option value="20 kg">20 kg</option>
                                            <option value="21 kg">21 kg</option>
                                            <option value="22 kg">22 kg</option>
                                            <option value="23 kg">23 kg</option>
                                            <option value="24 kg">24 kg</option>
                                            <option value="25 kg">25 kg</option>
                                            <option value="26 kg">26 kg</option>
                                            <option value="27 kg">27 kg</option>
                                            <option value="28 kg">28 kg</option>
                                            <option value="29 kg">29 kg</option>
                                            <option value="30 kg">30 kg</option>
                                            <option value="31 kg">31 kg</option>
                                            <option value="32 kg">32 kg</option>
                                            <option value="33 kg">33 kg</option>
                                            <option value="34 kg">34 kg</option>
                                            <option value="35 kg">35 kg</option>
                                            <option value="36 kg">36 kg</option>
                                            <option value="37 kg">37 kg</option>
                                            <option value="38 kg">38 kg</option>
                                            <option value="39 kg">39 kg</option>
                                            <option value="40 kg">40 kg</option>
                                            <option value="41 kg">41 kg</option>
                                            <option value="42 kg">42 kg</option>
                                            <option value="43 kg">43 kg</option>
                                            <option value="44 kg">44 kg</option>
                                            <option value="45 kg">45 kg</option>
                                            <option value="46 kg">46 kg</option>
                                            <option value="47 kg"> 47 kg</option>
                                            <option value="48 kg">48 kg</option>
                                            <option value="49 kg">49 kg</option>
                                            <option value="50 kg">50 kg </option>
                                            <option value="51 kg">51 kg</option>
                                            <option value="52 kg">52 kg</option>
                                            <option value="53 kg">53 kg</option>
                                            <option value="54 kg">54 kg</option>
                                            <option value="55 kg">55 kg</option>
                                            <option value="56 kg">56 kg</option>
                                            <option value="57 kg">57 kg</option>
                                            <option value="58 kg">58 kg</option>
                                            <option value="59 kg">59 kg</option>
                                            <option value="60 kg">60 kg</option>
                                            <option value="61 kg">61 kg</option>
                                            <option value="62 kg">62 kg</option>
                                            <option value="63 kg">63 kg</option>
                                            <option value="64 kg">64 kg</option>
                                            <option value="65 kg">65 kg</option>
                                            <option value="66 kg">66 kg</option>
                                            <option value="67 kg">67 kg</option>
                                            <option value="68 kg">68 kg</option>
                                            <option value="69 kg">69 kg</option>
                                            <option value="70 kg">70 kg</option>
                                            <option value="71 kg">71 kg</option>
                                            <option value="72 kg">72 kg</option>
                                            <option value="73 kg">73 kg</option>
                                            <option value="74 kg">74 kg</option>
                                            <option value="75 kg">75 kg</option>
                                            <option value="76 kg">76 kg</option>
                                            <option value="77 kg">77 kg</option>
                                            <option value="78 kg">78 kg</option>
                                            <option value="79 kg">79 kg </option>
                                            <option value="80 kg">80 kg</option>
                                            <option value="81 kg">81 kg</option>
                                            <option value="82 kg">82 kg</option>
                                            <option value="83 kg">83 kg</option>
                                            <option value="84 kg">84 kg</option>
                                            <option value="85 kg">85 kg</option>
                                            <option value="86 kg">86 kg</option>
                                            <option value="87 kg">87 kg</option>
                                            <option value="88 kg">88 kg</option>
                                            <option value="89 kg">89 kg</option>
                                            <option value="90 kg">90 kg</option>
                                            <option value="91 kg">91 kg</option>
                                            <option value="92 kg">92 kg</option>
                                            <option value="93 kg">93 kg</option>
                                            <option value="94 kg">94 kg</option>
                                            <option value="95 kg">95 kg</option>
                                            <option value="96 kg">96 kg</option>
                                            <option value="97 kg">97 kg</option>
                                            <option value="98 kg">98 kg</option>
                                            <option value="99 kg">99 kg</option>
                                            <option value="100 kg">100 kg</option>
                                            <option value="101 kg">101 kg</option>
                                            <option value="102 kg">102 kg</option>
                                            <option value="103 kg" >103 kg</option>
                                            <option value="104 kg">104 kg</option>
                                            <option value="105 kg">105 kg</option>
                                            <option value="106 kg">106 kg</option>
                                            <option value="107 kg">107 kg</option>
                                            <option value="108 kg">108 kg</option>
                                            <option value="109 kg">109 kg</option>
                                            <option value="110 kg">110 kg</option>
                                            <option value="111 kg">111 kg</option>
                                            <option value="112 kg">112 kg</option>
                                            <option value="113 kg">113 kg</option>
                                            <option value="114 kg">114 kg</option>
                                            <option value="115 kg">115 kg</option>
                                            <option value="116 kg">116 kg</option>
                                            <option value="117 kg">117 kg</option>
                                            <option value="118 kg">118 kg</option>
                                            <option value="119 kg">119 kg</option>
                                            <option value="120 kg">120 kg</option>
                                            <option value="121 kg">121 kg</option>
                                            <option value="122 kg">122 kg</option>
                                            <option value="123 kg">123 kg</option>
                                            <option value="124 kg">124 kg</option>
                                            <option value="125 kg"> 125 kg</option>
                                            <option value="126 kg">126 kg</option>
                                            <option value="127 kg">127 kg</option>
                                            <option value="128 kg">128 kg</option>
                                            <option value="129 kg">129 kg</option>
                                            <option value="130 kg">130 kg</option>
                                            <option value="131 kg">131 kg</option>
                                            <option value="132 kg">132 kg</option>
                                            <option value="133 kg">133 kg</option>
                                            <option value="134 kg">134 kg</option>
                                            <option value="135 kg">135 kg</option>
                                            <option value="136 kg">136 kg</option>
                                            <option value="137 kg">137 kg</option>
                                            <option value="138 kg">138 kg</option>
                                            <option value="139 kg">139 kg</option>
                                            <option value="140 kg">140 kg</option>
                                            <option value="141 kg">141 kg</option>
                                            <option value="142 kg">142 kg</option>
                                            <option value="143 kg">143 kg</option>
                                            <option value="144 kg">144 kg</option>
                                            <option value="145 kg">145 kg</option>
                                            <option value="146 kg">146 kg</option>
                                            <option value="147 kg">147 kg</option>
                                            <option value="148 kg">148 kg</option>
                                            <option value="149 kg">149 kg</option>
                                            <option value="150 kg">150 kg</option>
                                            <option value="151 kg">151 kg</option>
                                            <option value="152 kg">152 kg</option>
                                            <option value="153 kg">153 kg</option>
                                            <option value="154 kg">154 kg</option>
                                            <option value="155 kg">155 kg</option>
                                            <option value="156 kg">156 kg</option>
                                            <option value="157 kg">157 kg</option>
                                            <option value="158 kg">158 kg</option>
                                            <option value="159 kg">159 kg</option>
                                            <option value="160 kg">160 kg</option>
                                            <option value="161 kg">161 kg</option>
                                            <option value="162 kg">162 kg</option>
                                            <option value="163 kg">163 kg</option>
                                            <option value="164 kg">164 kg</option>
                                            <option value="165 kg">165 kg</option>
                                            <option value="166 kg">166 kg</option>
                                            <option value="167 kg">167 kg</option>
                                            <option value="168 kg">168 kg</option>
                                            <option value="169 kg">169 kg</option>
                                            <option value="170 kg">170 kg</option>
                                            <option value="171 kg">171 kg</option>
                                            <option value="172 kg">172 kg</option>
                                            <option value="173 kg">173 kg</option>
                                            <option value="174 kg">174 kg</option>
                                            <option value="175 kg">175 kg</option>
                                            <option value="176 kg">176 kg</option>
                                            <option value="177 kg">177 kg</option>
                                            <option value="178 kg">178 kg</option>
                                            <option value="179 kg">179 kg</option>
                                            <option value="180 kg">180 kg</option>
                                            <option value="181 kg">181 kg</option>
                                            <option value="182 kg">182 kg</option>
                                            <option value="183 kg">183 kg</option>
                                            <option value="184 kg">184 kg</option>
                                            <option value="185 kg">185 kg</option>
                                            <option value="186 kg">186 kg</option>
                                            <option value="187 kg">187 kg</option>
                                            <option value="188 kg">188 kg</option>
                                            <option value="189 kg">189 kg</option>
                                            <option value="190 kg">190 kg</option>
                                            <option value="191 kg">191 kg</option>
                                            <option value="192 kg">192 kg</option>
                                            <option value="193 kg">193 kg</option>
                                            <option value="194 kg">194 kg</option>
                                            <option value="195 kg">195 kg</option>
                                            <option value="196 kg">196 kg</option>
                                            <option value="197 kg">197 kg</option>
                                            <option value="198 kg">198 kg</option>
                                            <option value="199 kg">199 kg</option>
                                            <option value="200 kg">200 kg</option>
                                        </select>

                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }} className="form-row ht">
                                        <div className="form-row ht">
                                            <label>Age <b>{patientAge}</b></label>
                                        </div>
                                        <div className="form-row ht">
                                            <label>Gender <b>{patientGender}</b></label>
                                        </div>
                                        <div className="form-row ht">
                                            <label>Height <b>{patientHeight}</b></label>
                                        </div>
                                        <div className="form-row ht">
                                            <label>Weight <b>{patientWeight}, {patientAge}</b></label>
                                        </div>
                                        {/* <b>Gender:-{patientGender}</b> */}
                                    </div>

                                    {/* <div className="form-row ht">
                                            <label>LMP</label>
                                            <input type="text" />
                                        </div> */}
                                </div>

                            </div>
                            {/* </form> */}
                        </div>
                        <div className="border-top"></div>
                        <div className="tablecontent">
                            <div className="row">
                                <div className="col4">
                                    <h3>Chief Complaints</h3>
                                    {/* <input
                                        type="text"
                                        placeholder="Enter Symptoms"
                                        className="editsect"
                                        value={symptoms}
                                        onChange={this.handleChange}
                                        name='symptoms'

                                    /> */}
                                    <textarea rows="3" cols="40" name="symptoms"
                                        onChange={this.handleChange}
                                        placeholder="Enter Symptoms"
                                        value={symptoms}>
                                        {symptoms}
                                    </textarea>

                                    <h3>Lab Finding</h3>
                                    <textarea rows="3" cols="40" name="findings"
                                        onChange={this.handleChange}
                                        placeholder="Enter Lab Finding"
                                        value={findings}
                                    >
                                        {symptoms}
                                    </textarea>

                                    <h3>Suggested Investigation</h3>
                                    <textarea rows="3" cols="40"
                                        name="suggestedInvestigation"
                                        onChange={this.handleChange}
                                        placeholder="Enter Suggested Investigation"
                                        value={suggestedInvestigation}
                                    >
                                        {suggestedInvestigation}
                                    </textarea>


                                </div>
                                <div className="col6">
                                    <h3>Diagnoss Or Provisional Diaghosis</h3>
                                    <textarea className="spcins"
                                        placeholder="Add Prescription"
                                        onChange={this.handleChange}
                                        value={advice}
                                        name='advice'>
                                        {advice}
                                    </textarea>

                                </div>
                            </div>
                        </div>
                        <div className="border-bottom"></div>
                        <div className="spnotification">
                            <p>Special Instructions</p>
                            <textarea className="spcins"
                                placeholder="Special instructions"
                                name='special_advice'
                                value={special_advice}
                                onChange={this.handleChange}>
                                {special_advice}
                            </textarea>
                        </div>
                        <div className="stampsign">
                            <p>RMPs Signature & Stamp</p>
                        </div>

                        {/* <div className="border-bottom"></div>
                        <div className="footer1">
                            <p>Lorem Ipsum is simply dummy text of the printing </p>
                        </div> */}
                    </div>
                </div>
                <button
                    style={{
                        width: "6em",
                        height: "2em",
                        fontWeight: "bold",
                        fontSize: "1em",
                        color: "black",
                        backgroundColor: "green",
                    }}
                    type='submit' onSubmit={this.uploadPrescription}>
                    Submit
            </button>
            </div>

        );
    }
}
export default Prescription;
