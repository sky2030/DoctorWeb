import React from "react";
//import Nav from "./Nav";
import Footer from "./Footer";
import Dashboard from "./dashboard/Dashboard";
import Manageconsulation from "./Manageconsulation";
import Updatedoctorprofile from "./Updatedoctorprofile";
import Contact from "./Contact";
import Alltransation from "./Alltransaction";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Allappointment from "./UpcomingAppointment";
import ManageSlots from "./ManageSlots";
import Myprofile from "./DoctorProfile";
import splash from "./splash";
import Prescription from "./PrescriptionForm";
import Reports from "./Reports";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Nav /> */}
        <Switch>
          <Route path="/" exact component={splash} />
          <Route path="/Login" component={Login} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Manageconsulation" component={Manageconsulation} />
          <Route path="/Updatedoctorprofile" component={Updatedoctorprofile} />
          <Route path="/Contact" component={Contact} />
          <Route path="/Transaction" component={Alltransation} />
          <Route path="/Allappointment" component={Allappointment} />
          <Route path="/ManageSlots" component={ManageSlots} />
          <Route path="/Myprofile" component={Myprofile} />
          <Route path="/Prescription" component={Prescription} />
          <Route path="/Reports" component={Reports} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
