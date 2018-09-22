import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { loginUser, logoutUser } from "../../actions/loginUser"
import "./App.css"

class App extends Component {
  render() {

    return (
      <Router>
        <div className="app">
            React App
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loginUser, logoutUser }, dispatch)
export default connect(({ currentUser }) => ({ currentUser }), mapDispatchToProps)(App)