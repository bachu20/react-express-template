import React, { Component } from "react"
import _ from "lodash"

export default class _2 extends Component {
  state = {}

  handleSubmit = e => {
    e.preventDefault()

    const data = _.assign(this.props.state, this.state)
    this.props.saveData(data)
    this.props.nextStep()
  }

  ParentForm = () => <div>
    <h3 className="text-center">Profile: Parent</h3>

    <div className="form-row">
      <div className="col">
        <input type="text" className="form-control" placeholder="First name" onChange={({ target }) => this.setState({ firstName: target.value })} required />
      </div>
    </div>

    <div className="form-row">
      <div className="col">
        <input type="text" className="form-control" placeholder="Last name" onChange={({ target }) => this.setState({ lastName: target.value })} required />
      </div>
    </div>

    <div className="form-row">
      <div className="col-5">
        <input type="email" className="form-control" placeholder="johndoe@example.com" onChange={({ target }) => this.setState({ email: target.value })} required />
      </div>

      <div className="col-5">
        <input type="text" className="form-control" placeholder="555-555-5555 (optional)" onChange={({ target }) => this.setState({ phoneNumber: target.value })} />
      </div>

      <div className="col-2">
        <input type="number" className="form-control" placeholder="# of Kids" min="1" onChange={({ target }) => this.setState({ kids: target.value })} required />
      </div>
    </div>

    <div className="form-row">
      <div className="col">
        <input type="text" className="form-control" placeholder="1234 Main St" onChange={({ target }) => this.setState({ street: target.value })} required />
      </div>
    </div>

    <div className="form-row">
      <div className="col-5">
        <input type="text" className="form-control" placeholder="City" onChange={({ target }) => this.setState({ city: target.value })} required />
      </div>

      <div className="col-5">
        <input type="text" className="form-control" placeholder="State" onChange={({ target }) => this.setState({ state: target.value })} required />
      </div>

      <div className="col-2">
        <input type="text" className="form-control" placeholder="Zipcode" onChange={({ target }) => this.setState({ zipCode: target.value })} required />
      </div>
    </div>

    <div className="form-row">
      <div className="col">
        <textarea className="form-control" rows="6" style={{ resize: "none" }} placeholder="A little bit about me" onChange={({ target }) => this.setState({ bio: target.value })} required />
      </div>
    </div>
  </div>

  NannyForm = () => <div>
    <h3 className="text-center">Profile: Nanny</h3>

    <div className="form-row">
      <div className="col">
        <input type="text" className="form-control" placeholder="First name" onChange={({ target }) => this.setState({ firstName: target.value })} required />
      </div>
    </div>

    <div className="form-row">
      <div className="col">
        <input type="text" className="form-control" placeholder="Last name" onChange={({ target }) => this.setState({ lastName: target.value })} required />
      </div>
    </div>

    <div className="form-row">
      <div className="col-5">
        <input type="email" className="form-control" placeholder="johndoe@example.com" onChange={({ target }) => this.setState({ email: target.value })} required />
      </div>

      <div className="col-5">
        <input type="text" className="form-control" placeholder="555-555-5555 (optional)" onChange={({ target }) => this.setState({ phoneNumber: target.value })} />
      </div>

      <div className="col-2">
        <input type="number" className="form-control" placeholder="Experience" min="1" onChange={({ target }) => this.setState({ experience: target.value })} required />
      </div>
    </div>

    <div className="form-row">
      <div className="col">
        <input type="text" className="form-control" placeholder="1234 Main St" onChange={({ target }) => this.setState({ address: target.value })} required />
      </div>
    </div>

    <div className="form-row">
      <div className="col-5">
        <input type="text" className="form-control" placeholder="City" onChange={({ target }) => this.setState({ city: target.value })} required />
      </div>

      <div className="col-5">
        <input type="text" className="form-control" placeholder="State" onChange={({ target }) => this.setState({ state: target.value })} required />
      </div>

      <div className="col-2">
        <input type="text" className="form-control" placeholder="Zipcode" onChange={({ target }) => this.setState({ zipcode: target.value })} required />
      </div>
    </div>

    <div className="form-row">
      <div className="col">
        <textarea className="form-control" rows="6" style={{ resize: "none" }} placeholder="A little bit about me" onChange={({ target }) => this.setState({ bio: target.value })} required />
      </div>
    </div>
  </div>

  render() {
    const FormComponent = this.props.state.role === "parent" ?
      this.ParentForm() :
      this.NannyForm()

    return <div className="_2 max-width">
      <form onSubmit={e => this.handleSubmit(e)}>
        { FormComponent }

        <div className="button">
          <button className="btn">Next Step</button>
        </div>
      </form>
    </div>
  }
}