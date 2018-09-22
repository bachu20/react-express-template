import { constants } from '../actions/constants'

const LoginReducer = (state = {}, action) => {
  switch(action.type) {
    case constants.LOGIN_USER:
      return { user: action.payload, isLoggedIn: true }

    default:
      return { user: null, isLoggedIn: false }
  }
}

export default LoginReducer