import React, { Component } from "react"
import _ from "lodash"

export default class _4 extends Component {
  state = { showPassword: false }

  handleSubmit = (e) => {
    e.preventDefault()

    const { state: { password }, props: { state, saveData, completeSignup } } = this

    saveData(_.assign(state, { password }))
    completeSignup()
  }

  render() {
    const passwordClass = this.state.showPassword ? "fas fa-eye" : "far fa-eye-slash"
    const passwordInputType = this.state.showPassword ? "text" : "password"

    return <div className="_4 max-width">
      <form onSubmit={e => this.handleSubmit(e)}>
        <h3>Complete Registration</h3>

        <hr style={{ opacity: 0 }} />

        <input type="email" className="form-control disabled" placeholder={`${this.props.state.email} (User ID Locked)`} />

        <div className="form-row">
          <div className="col-11">
            <input type={passwordInputType} className="form-control" placeholder="new password" onChange={e => this.setState({ password: e.target.value })} />
          </div>

          <div className="col-1 d-flex align-items-center justify-content-center">
            <i className={passwordClass} onClick={() => this.setState({ showPassword: !this.state.showPassword })} />
          </div>
        </div>

        <hr style={{ opacity: 0 }} />

        <div className="button text-center">
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  }
}
