import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard/dashboard.css';
import { Link } from 'react-router-dom';
import AppointmentCard from './AppointmentCard';

class Allappointment extends React.Component{
    render(){
        return(

           <div className="alldept pb15">
		   <div className="backarrow"> <Link to='/Dashboard'><i className="fas fa-arrow-left"></i></Link></div>
		   <h2>All Appointment</h2>
		   <AppointmentCard />
		   <AppointmentCard />
		   <AppointmentCard />
		   <AppointmentCard />
		   <AppointmentCard />
		 
		   </div>
         
        )
       }
         }
         export default Allappointment;
