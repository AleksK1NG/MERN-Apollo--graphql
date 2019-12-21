import React, { createContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

const initialState = {
  user: null,
}

// Persist user state from localstorage on page reload
const token = localStorage.getItem('jwtToken')

if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    initialState.user = decodedToken
  }
}

const AuthContext = createContext({
  user: null,
  loginUser: (userDate) => {},
  logoutUser: () => {},
})

const authReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        user: payload,
      }
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      }

    default:
      return state
  }
}

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const loginUser = (userData) => {
    localStorage.setItem('jwtToken', userData.token)
    dispatch({ type: LOGIN_USER, payload: userData })
  }

  const logoutUser = () => {
    localStorage.removeItem('jwtToken')
    dispatch({ type: LOGOUT_USER })
  }

  return <AuthContext.Provider value={{ user: state.user, loginUser, logoutUser }} {...props} />
}

export { AuthContext, AuthProvider }
