import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard/dashboard.css';
import { Link } from 'react-router-dom';

class Manageconsulation extends React.Component{
    render(){
        return(

           <div className="adddept">
		    <div className="backarrow"> <Link to='/Doctorlist'><i className="fas fa-arrow-left"></i></Link></div>
		   <h2>Manage Consultation</h2>
		  <form action="#">
		  <h3>Sanjeev</h3>
		   <div className="row">
			  <select>
			   <option>Day From</option>
			    <option>Sunday</option>
				 <option>Monday</option>
				  <option>Tuesday</option>
				   <option>Wednesday</option>
				   <option>Thursday</option>
				   <option>Friday</option>
				   <option>Saturday</option>
			   </select>
			  </div>
			  <div className="row">
			  <select>
			   <option>Day To</option>
			    <option>Sunday</option>
				 <option>Monday</option>
				  <option>Tuesday</option>
				   <option>Wednesday</option>
				   <option>Thursday</option>
				   <option>Friday</option>
				   <option>Saturday</option>
			   </select>
			 </div>
			  <div className="row">
			   <select>
			   <option>Start Time</option>
			    <option>09:00 AM</option>
				 <option>10:00 AM</option>
				  <option>11:00 AM</option>
				   <option>12:00 PM</option>
				   <option>01:00 PM</option>
				   <option>02:00 PM</option>
				   <option>03:00 PM</option>
				   <option>04:00 PM</option>
			   </select>
			 </div>
			  <div className="row">
			    <select>
			   <option>End Time</option>
			    <option>10:00 AM</option>
				 <option>11:00 AM</option>
				  <option>12:00 PM</option>
				   <option>01:00 PM</option>
				   <option>02:00 PM</option>
				   <option>03:00 PM</option>
				   <option>04:00 PM</option>
				   <option>05:00 PM</option>
				   <option>06:00 PM</option>
			   </select>
			 </div>
			 <div className="row">
			    <select>
			   <option>Slot Duration</option>
			    <option>10</option>
				 <option>15</option>
				  <option>20</option>
				   <option>30</option>
			   </select>
			 </div>
			  
			 <div className="btncontainer">
			 <button> <i className="fas fa-save"></i> Save </button>
			 <button><i className="far fa-window-close"></i>Cancel</button>
			 </div>
			</form> 
		   </div>
         
        )
       }
         }
         export default Manageconsulation;