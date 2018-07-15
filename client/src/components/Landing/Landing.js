import React from "react"
import { Link } from "react-router-dom"
import "./Landing.css"

const ActionButton = ({ text, link, extraClass }) => <span className={`action-button ${extraClass}`}>
  <div>
    <p>Sign</p>
    <Link to={link}>
      <button>{ text }</button>
    </Link>
  </div>
</span>

export const Landing = () => {
  const subheading = "Dolor minim ad do id consequat incididunt duis incididunt aliqua eiusmod et adipisicing do."

  return <div className="landing max-width">
    <div className="main">
      <div className="heading">
        <div>
          <h1>Tembii</h1>
          <h2>{ subheading }</h2>
        </div>
      </div>

      <div className="action-buttons">
        <ActionButton text="In" link="/signin" />
        <ActionButton text="Up" link="/signup" extraClass="justify-content-end" />
      </div>
    </div>
  </div>
}