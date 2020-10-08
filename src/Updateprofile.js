import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard/dashboard.css';
import { Link } from 'react-router-dom';

class Updateprofile extends React.Component{
    render(){
        return(

           <div className="adddept">
		    <div className="backarrow"> <Link to='/Doctorlist'><i className="fas fa-arrow-left"></i></Link></div>
		   <h2>Update Doctor</h2>
		   
		   <form action="#">
		   <div className="row">
			  <input type="text" placeholder="Sanjeev" />
			  </div>
			  <div className="row">
			   <input type="text" placeholder="Sharma" />
			 </div>
			  <div className="row">
			   <input type="text" placeholder="sbatra@hotmail.com" />
			 </div>
			  <div className="row">
			   <input type="text" placeholder="2345236524" />
			 </div>
			  <div className="row">
			   <input type="password" placeholder="******" />
			 </div>
			  <div className="row">
			   <select>
			   <option>Male</option>
			    <option>Male</option>
				 <option>Female</option>
			   </select>
			 </div>
			  <div className="row">
			   <select>
			   <option>Cardiology</option>
			   <option>Neorology</option>
				 <option>Orthopadic</option>
				  <option>Dental Care</option>
				 <option>Cardiology</option>
				 <option>Management</option>
			   </select>
			 </div>
			   <div className="row">
			   <input type="text" placeholder="14/09/1968" />
			 </div>
			  <div className="row">
			   <input type="text" placeholder="1200767564" />
			 </div>
			  <div className="row">
			   <input type="text" placeholder="15 Year" />
			 </div>
			  <div className="row">
			   <input type="text" placeholder="MBBS, MD" />
			 </div>
			  <div className="row">
			   <input type="text" placeholder="Heart Specialist" />
			 </div>
			  <div className="row">
			   <input type="text" placeholder="Senior Heart Specialist" />
			 </div>
			 <div className="btncontainer">
			 <button><i className="fas fa-check"></i>Upload Image </button>
			 <button><i className="fas fa-save"></i>Update Details</button>
			 </div>
			</form> 
		   </div>
         
        )
       }
         }
         export default Updateprofile;
