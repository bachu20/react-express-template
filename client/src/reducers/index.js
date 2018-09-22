import { combineReducers } from "redux"

import LoginReducer from "./loginReducer"

const rootReducer = combineReducers({
  currentUser: LoginReducer
})

export default rootReducer