import React from "react"
import faker from "faker"
import "./Profile.css"

export const Profile = props => {
  const { user } = props.user.data

  return <div className="profile max-width">
    <div className="main">
      <div className="profile-card row">
        <div className="col-lg-6">
          <img src="https://goo.gl/pz6U83" className="img-fluid" alt="" />
        </div>

        <div className="col-lg-6">
          <div className="details">
            <h3 className="text-capitalize">{ user.firstName } { user.lastName }</h3>
            <h6 className="text-lowercase">{ user.email } &#9679; { user.phoneNumber }</h6>

            <hr />

            <div className="extra row">
              <div className="col-4">
                <h4># of Kids</h4>
                <p>{ faker.random.number(1, 5) }</p>
              </div>

              <div className="col-4">
                <h4>City</h4>
                <p className="text-capitalize">{ user.city }</p>
              </div>

              <div className="col-4">
                <h4>State</h4>
                <p className="text-uppercase">{ user.state }</p>
              </div>

              <div className="col-12 bio">
                <h4>Bio</h4>
                <p>{ user.bio.substring(0, 100) }...</p>
              </div>
            </div>

            <hr style={{ opacity: 0 }} />

            <div className="button">
              <button className="btn">My Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
