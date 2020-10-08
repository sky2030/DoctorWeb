import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
// import Adddepartment from './Adddepartment';
// import Alldepartment from './Alldepartment';
// import Detaildepartment from './Detaildepartment';
// import Editdepartment from './Editdepartment';
// import Adddoctor from './Adddoctor';
// import Doctorlist from './Doctorlist';
import Dashboard from './dashboard/Dashboard';
import Doctorprofile from './Doctorprofile';
import Updateprofile from './Updateprofile';
// import Adddoctorfee from './Adddoctorfee'; 
import Manageconsulation from './Manageconsulation';
// import Myhospital from './Myhospital'; 
import Updatedoctorprofile from './Updatedoctorprofile';
import Contact from './Contact';
import Alltransation from './Alltransation';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Allappointment from './UpcomingAppointment'
import ManageSlots from './ManageSlots'
import Myprofile from './Profile'
import splash from './splash'

function App() {
	return (
		<Router>
			<div className="App">
				<Nav />
				<Switch>
					<Route path="/" exact component={Login} />
					<Route path="/Dashboard" component={Dashboard} />
					<Route path="/Doctorprofile" component={Doctorprofile} />
					<Route path="/Updateprofile" component={Updateprofile} />
					<Route path="/Manageconsulation" component={Manageconsulation} />
					<Route path="/Updatedoctorprofile/:id" component={Updatedoctorprofile} />
					<Route path="/Contact" component={Contact} />
					<Route path="/Alltransation" component={Alltransation} />
					<Route path="/Allappointment" component={Allappointment} />
					<Route path="/ManageSlots" component={ManageSlots} />
					<Route path="/Myprofile" component={Myprofile} />
					<Route path="/Login" component={Login} />
					<Route path="/splash" component={splash} />
				</Switch>

			</div>
			<Footer />
		</Router>
	);
}


export default App;
