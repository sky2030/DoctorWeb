import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard/dashboard.css';
// import nerology from './img/Nerology.png';
// import dentist1 from './img/dentist1.png';
// import cardio from './img/cardio.png';
import docicon from './img/doctor-icon.jpg';
import { Link } from 'react-router-dom';

class Doctorprofile extends React.Component{
    render(){
        return(

           <div className="detailsdept">
		    <div className="backarrow"> <Link to='/Doctorlist'><i className="fas fa-arrow-left"></i></Link></div>
		   <h2>Doctor Profile</h2>
		   <div className="scrolldiv">
		   <img src={docicon} alt="Neorology" /> 
		   <h3>Dr. Sanjeev Sharma</h3>
		   <p>Senior Heart Specialist</p>
		   <ul className="dlist">
		   <li><i className="fas fa-user"></i>Cardiology</li>
		   <li><i className="fas fa-user-md"></i>18 Years</li>
		   <li><i className="fas fa-certificate"></i>MBBS, MD</li>
		   <li><i className="far fa-envelope"></i>sbatra@hotmail.com</li>
		   <li><i className="fas fa-phone-alt"></i>2345236524</li>
		   <li><i className="fas fa-rupee-sign"></i>2000</li>
		   <li><i className="fas fa-birthday-cake"></i>21/09/1968</li>
		   </ul>
		    <Link to='/Updateprofile'><button><i className="far fa-edit"></i> Update Details </button></Link>
		   <button><i className="fas fa-trash"></i>Delete </button>
		   <Link to='/Adddoctorfee'><button><i className="fas fa-rupee-sign"></i>Add Fees </button></Link>
		   <Link to='/Manageconsulation'><button><i className="fas fa-hospital"></i>Manage Slots </button> </Link> 
		   </div>
		   </div>
         
        )
       }
         }
         export default Doctorprofile;
