import React from 'react'

import { Route, Switch } from 'react-router-dom'
import AuthRoute from '../Pages/AuthRoute/AuthRoute'

const LoginPage = React.lazy(() => import('../Pages/LoginPage/LoginPage'))
const RegisterPage = React.lazy(() => import('../Pages/RegisterPage/RegisterPage'))
const HomePage = React.lazy(() => import('../Pages/HomePage/HomePage'))

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <AuthRoute exact path="/login" component={LoginPage} />
      <AuthRoute exact path="/register" component={RegisterPage} />
    </Switch>
  )
}
export default Routes
