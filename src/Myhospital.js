 import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard/dashboard.css';
//import docicon from './img/doctor-icon.jpg';
import maxhosp from './img/maxhospital.jpg';
import { Link } from 'react-router-dom'; 

class Myhospital extends React.Component{
    render(){
        return(
 
 <div className="dashboard_wrap">
 <div className="banner-text">
  <img style={{width: "100%"}} src={maxhosp} alt="hospital_img" />
   </div>
   <div className="flex-container scroll">
   
   <div className="col5 box-shad">
   <h3>Contact Information</h3>
   <p><i className="far fa-envelope"></i> maxsupport@maxsuper.org</p>
   <p><i className="fas fa-phone-alt"></i>120-34232334</p>
   </div>
   <div className="col5 box-shad">
    <h3><i className="fas fa-map-marker-alt"></i>Address</h3>
    <p><b>Place:</b> 1,2, Press Enclave Marg</p>
	<p><b>Landmark:</b> Saket Institutional Area</p>
	<p><b>District:</b> South</p>
	<p><b>State:</b> Delhi <b>Pin Code:</b> 110017</p>
   </div>
   </div>
   
   <div className="add_departmet">
		  <Link to='/Updatehospitaldetails'><i className="far fa-edit"></i> Update Details </Link>
		  </div>
   </div>
  
   
     )
       }
         }
  export default Myhospital;
