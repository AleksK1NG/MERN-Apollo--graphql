import React from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

const LoginPage = React.lazy(() => import('../Pages/LoginPage'))
const RegisterPage = React.lazy(() => import('../Pages/RegisterPage'))
const HomePage = React.lazy(() => import('../Pages/HomePage'))

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </section>
  )
}
export default Routes
