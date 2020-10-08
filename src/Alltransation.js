import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard/dashboard.css';
import { Link } from 'react-router-dom';
import Transationcard from './Transationcard';

class Alltransation extends React.Component{
    render(){
        return(

           <div className="alldept pb15">
		   <div className="backarrow"> <Link to='/Dashboard'><i className="fas fa-arrow-left"></i></Link></div>
		   <h2>All Transation</h2>
		   <Transationcard />
		   <Transationcard />
		   <Transationcard />
		   <Transationcard />
		   <Transationcard />
		 
		   </div>
         
        )
       }
         }
         export default Alltransation;
