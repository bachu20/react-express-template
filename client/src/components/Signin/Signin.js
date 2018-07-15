import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import "./Signin.css"

export default class Signin extends Component {
  state = { success: false, failure: false }

  handleInput = ({ target }, key) => this.setState({ [key]: target.value })

  handleLogin = e => {
    e.preventDefault()

    const { email, password } = this.state

    if (!(email && password)) return

    return Promise.resolve()
      .then(() => this.props.loginUser({ email, password }))
      .then(() => this.setState({ success: true, failure: false }))
      .catch(err => this.setState({ email: '', password: '', failure: true }))
  }

  render() {
    const loginFailure = this.state.failure
      ? <div className="alert alert-warning alert-dismissible fade show mt-4" role="alert">
          <strong>Login Unsuccessful</strong>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      : <span />

    return this.state.success
      ? <Redirect to="/profile" />
      : <div className="signin max-width">
          <div className="main">
            <form onSubmit={e => this.handleLogin(e)}>
              <h3>Login</h3>

              <hr />

              <div className="form-row">
                <div className="col">
                  <input type="email" className="form-control" placeholder="User ID" onChange={e => this.handleInput(e, "email")} value={this.state.email} required />
                </div>
              </div>

              <div className="form-row">
                <div className="col">
                  <input type="password" className="form-control" placeholder="Password" onChange={e => this.handleInput(e, "password")} value={this.state.password} required />
                </div>
              </div>

              <div className="button">
                <button className="btn">Login</button>
              </div>

              { loginFailure }
            </form>
          </div>
        </div>
  }
}
