import React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

const SocialButton = ({ icon, link }) => <a href={link} className="social-button" target="_blank">
  <button>
    <i className={icon} />
  </button>
</a>

const NavIcon = ({ isLoggedIn, logout }) => {
  const NavItems = isLoggedIn
    ? <div className="dropdown-menu  dropdown-menu-right" aria-labelledby="ex3">
        <Link to="/" className="dropdown-item">Home</Link>
        <Link to="/profile" className="dropdown-item">Profile</Link>
        <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
        <button className="dropdown-item" type="button" onClick={() => logout()}>Logout</button>
      </div>

    : <div className="dropdown-menu dropdown-menu-right" aria-labelledby="ex3">
        <Link to="/" className="dropdown-item">Home</Link>
        <Link to="/signin" className="dropdown-item">Signin</Link>
        <Link to="/signup" className="dropdown-item">Signup</Link>
      </div>

  return <div className="btn-group">
    <div className="nav-icon" id="ex3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i className="fas fa-bars" />
    </div>

    { NavItems }
  </div>
}

export const Navbar = ({ isLoggedIn, logout }) => {
  const icons = [
    { icon: "fab fa-twitter", link: "https://twitter.com/?lang=enfac" },
    { icon: "fab fa-facebook", link: "https://www.facebook.com/"},
    { icon: "fab fa-instagram", link: "https://www.instagram.com/?hl=en" }
  ]

  return <div className="navigation max-width">
    <div className="social-buttons">
    { icons.map(({ icon, link }, index) => <SocialButton icon={icon} link={link} key={index} />) }
    </div>

    <div className="menu text-right">
      <NavIcon isLoggedIn={isLoggedIn} logout={logout} />
    </div>
  </div>
}