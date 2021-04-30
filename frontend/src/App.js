import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Navbar from './components/templates/Navbar'
import Profile from './components/Applicant/Profile'
import Profile_Recruiter from  './components/Recruiter/Profile'
import Login from './components/Common/Login'
import Job_Details from "./components/Recruiter/Job_Details";
import Rec_List from "./components/Recruiter/MyJobs";
import Rec_Dash from "./components/Recruiter/Dashboard";
import User_Dash from "./components/Applicant/User_Dashboard";
import JobList from "./components/Applicant/JobList";
import User_SOP from "./components/Applicant/Sop";
import Applications from "./components/Applicant/Applications";
import Rec_Applicants from "./components/Recruiter/Applicants";
import Accepted from "./components/Recruiter/Accepted";
import LogOut from "./components/Common/LogOut";

function App() {

  return (
      <Router>
        <div className="container">
          <Route path="/" exact component={Home}/>
          <Route path="/user/jobs" exact component={JobList}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/recruiter/profile" exact component={Profile_Recruiter}/>
          <Route path="/recruiter/profile/edit" exact component={Profile_Recruiter}/>
          <Route path="/recruiter/job" component={Job_Details}/>
          <Route path="/recruiter/applicants" component={Rec_Applicants}/>
          <Route path="/recruiter/accepted" component={Accepted}/>
          <Route path="/recruiter/list" component={Rec_List}/>
          <Route path="/recruiter/dash" component={Rec_Dash}/>
          <Route path="/user/dash" component={User_Dash}/>
          <Route path="/user/edit" component={Profile}/>
          <Route path="/user/sop" component={User_SOP}/>
          <Route path="/user/applications" component={Applications}/>
          <Route path="/logout" component={LogOut}/>

        </div>
      </Router>
  );
}

export default App;
