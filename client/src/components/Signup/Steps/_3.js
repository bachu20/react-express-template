import React, { Component } from "react"
import faker from "faker"
import _ from "lodash"

// for testing purposes only
const sampleQuestions = [1].map(v => ({
  question: `I think ${faker.address.state()} is a great place to live?`,
  questionID: '7fd8d6f6-c684-4afa-b7c4-34e29b4e4987'
}))
// for testing purposes only


export default class _3 extends Component {
  state = { currentQuestion: 1, _true: false, _false: false }

  getRadioState = method => {
    const { state, state: { currentQuestion } } = this
    const hasAnswer = method === "prev"
      ? _.get(state, String(currentQuestion - 1), null)
      : _.get(state, String(currentQuestion + 1), null)

    const defaultState = { _true: false, _false: false }
    return _.isNull(hasAnswer) ? defaultState :  _.assign(defaultState, { [`_${hasAnswer.response}`]: { response: true } })
  }

  nextQuestion = () => {
    const { currentQuestion } = this.state

    if (currentQuestion >= sampleQuestions.length) return

    const state = _.assign(this.getRadioState("next"), { currentQuestion: currentQuestion + 1 })
    this.setState(state)
  }

  previousQuestion = () => {
    const { currentQuestion } = this.state

    if (currentQuestion <= 1) return

    const state = _.assign(this.getRadioState("prev"), { currentQuestion: currentQuestion - 1 })
    this.setState(state)
  }

  handleRadio = ({ target }) => {
    const { currentQuestion } = this.state
    const questionID = sampleQuestions[currentQuestion - 1].id

    const state = target.value === "true"
      ? { _true: true, _false: false, [String(currentQuestion)]: { questionID, response: true } }
      : { _true: false, _false: true, [String(currentQuestion)]: { questionID, response: false } }

    this.setState(state)
  }

  canSubmit = () => (_.keys(this.state).length - 3) === sampleQuestions.length

  handleSubmit = (e) => {
    e.preventDefault()

    if (!this.canSubmit()) return

    const data = _.assign(this.props.state, {
      responses: _(this.state).omit('currentQuestion', '_true', '_false').values().value()
    })

    this.props.saveData(data)
    this.props.nextStep()
  }

  render() {
    const {
      state: { currentQuestion, _true, _false }, handleRadio,
      handleSubmit, previousQuestion, nextQuestion, canSubmit
    } = this
    const question = sampleQuestions[currentQuestion - 1]
    const showPrev = currentQuestion > 1
    const showNext = currentQuestion < sampleQuestions.length

    return <div className="_3 max-width">
      <form onSubmit={e => handleSubmit(e)}>
        <div className="heading">
          <h3>{ question['question'] }</h3>
          <h4>{ currentQuestion }</h4>
        </div>

        <hr />

        <div className="custom-control custom-radio">
          <input type="radio" id="trueRadio" name="radio" value="true" className="custom-control-input" onChange={e => handleRadio(e)} checked={_true} />
          <label className="custom-control-label" htmlFor="trueRadio">True</label>
        </div>

        <div className="custom-control custom-radio">
          <input type="radio" id="falseRadio" name="radio" value="false" className="custom-control-input" onChange={e => handleRadio(e)} checked={_false} />
          <label className="custom-control-label" htmlFor="falseRadio">False</label>
        </div>

        <div className="nav-buttons">
          <i className={`fas fa-caret-left ${showPrev ? '' : 'disabled'}`} onClick={() => previousQuestion()} />
          <button className={`btn ${canSubmit() ? '' : 'disabled'}`}>Submit</button>
          <i className={`fas fa-caret-right ${showNext ? '' : 'disabled'}`} onClick={() => nextQuestion()} />
        </div>
      </form>
    </div>
  }
}