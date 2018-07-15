import { constants } from "./constants"
import { api } from "../utils/api"

export const loginUser = requestPayload => ({
  type: constants.LOGIN_USER,
  payload: api.post('/login', requestPayload)
})

export const logoutUser = () => ({ type: constants.LOGOUT_USER })