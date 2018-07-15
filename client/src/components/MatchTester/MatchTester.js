import React, { Component } from "react"
import _ from "lodash"
import Promise from "bluebird"
import "./MatchTester.css"

import { api } from "../../utils/api"

export default class MatchTester extends Component {
  state = { questions: [], matches: [1,2,3] }

  componentDidMount() {
    return Promise.resolve()
      .then(() => api.get('/questions'))
      .then(({ data }) => this.setState({ questions: _.shuffle(data) }))
      .catch(err => console.log('error:', err))
  }

  displayMatch = (match, key) => {
    return <div className="match card" key={key}>
      <div className="card-header">
        Featured
      </div>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="/somewhere" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  }

  handleOption = ({ target }, key) => this.setState({ [key]: { value: target.value, placement: key } })

  getOptionsField = (question, key) => {
    const selectName = `select${question.placement}`

    return <div className="form-group" key={key}>
      <label htmlFor={selectName} className="bmd-label-floating">{ question.text }.</label>
      <select className="form-control" id={selectName} onChange={e => this.handleOption(e, question.placement)}>
        <option>definitely disagree</option>
        <option>disagree</option>
        <option>neutral</option>
        <option>agree</option>
        <option>definitely agree</option>
      </select>
    </div>
  }

  getMatches = e => {
    e.preventDefault()

    const responses = _.omit(this.state, 'questions', 'matches');
    return Promise.resolve()
      .then(() => api.post('/questions/match', { family_id: 'b8f9eaea-ffa3-40fb-88e0-712fa866bf0c' }))
      .then(matches => console.log('matches:', matches))
      .catch(err => console.log('error:', err))
  }

  render() {
    const { questions, matches } = this.state

    console.log(this.state)

    return (
      <div className="match-tester max-width">
        <div className="main row">
          <div className="col-lg-6 col-md-12">
            <form onSubmit={e => this.getMatches(e)}>
              <h3>Sample Questionaire</h3>

              <hr />

              { questions.map((q, k) => this.getOptionsField(q, k)) }
              <div className="button text-right">
                <button className="btn">Test</button>
              </div>
            </form>
          </div>

          <div className="col-lg-6 col-md-12">
          { matches.map((match, key) => this.displayMatch(match, key)) }
          </div>
        </div>
      </div>
    )
  }
}
