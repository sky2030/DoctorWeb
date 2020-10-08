import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard.css';
import bgimg from './img/bgimg.jpg';
import { Link } from 'react-router-dom';

 class Dashboard extends React.Component{
    render(){
        return(
           
                
               
            <div className="dashboard_wrap">
                <div className="dashboard_maincontent">
                <img src={bgimg} alt="doctor-img" />
                <div className="dashboard_icons">
                    <ul>
					
                        <li><Link to='/Allappointment'><i className="fas fa-plus-square"></i>Upcoming Appointment</Link></li>
                        <li><Link to='/ManageSlots'><i className="fas fa-user-md"></i>Manage Slots</Link></li>
                        <li><Link to='/Myprofile'><i className="fas fa-user"></i>My Profile</Link></li>
                        <li><Link to='/Alltransation'><i className="fas fa-credit-card"></i>Transaction</Link></li>
						
                    </ul>
                </div>
                </div>
            </div>
           

        
        )
    }
}
export default Dashboard;