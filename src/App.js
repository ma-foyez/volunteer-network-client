import React, { createContext, useState } from 'react';
import Header from './Components/Header/Header';
import AdminPanel from './Components/Dashboard/AdminPanel/AdminPanel'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import TopContainer from './Components/TopContainer/TopContainer';
import RegisterVolunteer from './Components/RegisterVolunteer/RegisterVolunteer';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import VolunteerActivities from './Components/VolunteerActivities/VolunteerActivities';
import Footer from './Components/Footer/Footer';
import NotFound from './Components/NotFound/NotFound';


export const userContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <TopContainer />
          </Route>
          <Route path="/home">
            <TopContainer />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <AdminPanel />
          </Route>
          <PrivateRoute path="/registerVolunteer/:volunteerID">
            <RegisterVolunteer />
          </PrivateRoute>
          {/* <PrivateRoute path="/admin">
            <AdminPanel />
          </PrivateRoute> */}
          <PrivateRoute path="/volunteerActivities">
            <VolunteerActivities />
          </PrivateRoute>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </Router>


    </userContext.Provider>
  );
}

export default App;
