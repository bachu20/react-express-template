import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { loginUser, logoutUser } from "../../actions/loginUser"
import { PrivateRoute } from "../privateRoute"
import "./App.css"

import { Navbar } from "../Navbar/Navbar"
import { Landing } from "../Landing/Landing"
import Signin from "../Signin/Signin"
import SignupWizard from "../Signup/Signup"

import { Profile } from "../Profile/Profile"
import { Dashboard } from "../Dashboard/Dashboard";

import MatchTester from "../MatchTester/MatchTester"

class App extends Component {
  render() {
    const { loginUser, logoutUser, currentUser } = this.props

    return (
      <Router>
        <div className="app">
          <Navbar isLoggedIn={currentUser.isLoggedIn} logout={logoutUser} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={SignupWizard} />
          <Route exact path="/signin" render={() => <Signin loginUser={loginUser} />} />

          <Route exact path="/testing" component={MatchTester} />

          <PrivateRoute exact path="/profile" user={currentUser} component={Profile} />
          <PrivateRoute exact path="/dashboard" user={currentUser} component={Dashboard} />
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loginUser, logoutUser }, dispatch)
export default connect(({ currentUser }) => ({ currentUser }), mapDispatchToProps)(App)