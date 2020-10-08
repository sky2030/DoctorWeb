import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard/dashboard.css';
//import docicon from './img/doctor-icon.jpg';
//import { Link } from 'react-router-dom';
// import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
// import * as GrIcons from "react-icons/gr";


class ManageSlotscard extends React.Component{
	 render(){
        return(
        
 <div className="doctor-card col">
  <div to='/Doctorprofile'>
  <div className='textheader'>
                 <div className='bodyheadernew'>
                <div className='bodytext'>
                   <p className='slotalign'>Monday</p>
                   <p className='slotalign1'>10:00AM</p>
                   </div> 
                </div>

                <div className='bodytex3'>
                <p className='amountdiv1'>
                <AiIcons.AiFillEdit className="slotIcons"/>
                </p>
                </div>
                <div className='bodytex3'>
                <p className='amountdiv1'>
                <AiIcons.AiFillDelete className="slotIcons"/>
                </p>
                </div>
                </div>
	   </div>
   </div>
  
  
   
     )
       }
         }
  export default ManageSlotscard;
