import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"
import Promise from "bluebird"
import { api } from "../../utils/api"
import "./Signup.css"

import { Steps } from "./Steps"

export default class SignupWizard extends Component {
  state = {
    isComplete: false,
    failure: false,
    step: 1,
    newUser: {}
  }

  saveData = newState => this.setState({ newUser: newState })

  prevStep = () => {
    const { step } = this.state

    if (step > 1) {
      this.setState({ step: step - 1 })
    }
  }

  nextStep = () => {
    const { step } = this.state
    const limit = _.keys(Steps).length

    if (step < limit) {
      this.setState({ step: step + 1 })
    }
  }

  completeSignup = () => Promise.resolve()
    .then(() => _.mapKeys(this.state.newUser, (v, k) => _.snakeCase(k)))
    .then(newUser => api.post("/users", newUser))
    .then(() => this.setState({ isComplete: true }))
    .catch(() => this.setState({ failure: true }))

  render() {
    const { state, saveData, prevStep, nextStep, completeSignup } = this
    const StepComponent = Steps[state.step - 1]({
      state: state.newUser,
      saveData,
      nextStep,
      prevStep,
      completeSignup
    })

    return state.isComplete
      ? <Redirect to="/signin" />
      : <div className="signup-wizard max-width">
          <div className="main">
          { StepComponent }
          </div>
        </div>
  }
}