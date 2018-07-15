import React from "react"
import { Link } from "react-router-dom"
import "./Dashboard.css"

const DashboardCard = ({ children, extraClass = '' }) => <div className="dashboard-card">
{ children }
</div>

export const Dashboard = () => {
  return <div className="dashboard max-width">
    <div className="row">
      <div className="col-md-4">
        <Link to="/">
          <DashboardCard>My Profile</DashboardCard>
        </Link>
      </div>

      <div className="col-md-4">
        <Link to="/">
          <DashboardCard>Family</DashboardCard>
        </Link>
      </div>

      <div className="col-md-4">
        <Link to="/">
          <DashboardCard>Nanny</DashboardCard>
        </Link>
      </div>

      <div className="col-md-4">
        <Link to="/">
          <DashboardCard>
            <i className="fas fa-phone" />
          </DashboardCard>
        </Link>
      </div>

      <div className="col-md-4">
        <Link to="/">
          <DashboardCard>
            <i className="far fa-envelope" />
          </DashboardCard>
        </Link>
      </div>

      <div className="col-md-4">
        <Link to="/">
          <DashboardCard>
            <i className="fas fa-heart" />
          </DashboardCard>
        </Link>
      </div>
    </div>
  </div>
}