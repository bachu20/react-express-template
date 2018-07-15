import React from "react"

const RoleCard = ({ userRole, saveData, nextStep }) => {
  const selectRole = () => {
    saveData({ role: userRole.toUpperCase() })
    nextStep()
  }

  return <div className="role-card">
    <h3 className="text-capitalize">{ userRole }</h3>
    <div onClick={() => selectRole()}>
      <i className="fas fa-question" />
    </div>
  </div>
}

export const _1 = ({ saveData, nextStep }) => {
  const props = { saveData, nextStep }

  return <div className="_1 max-width">
    <h2>ARE YOU A...</h2>

    <div className="row">
      <div className="col-md-6">
        <RoleCard userRole="parent" {...props} />
      </div>

      <div className="col-md-6">
        <RoleCard userRole="nanny" {...props} />
      </div>
    </div>
  </div>
}
