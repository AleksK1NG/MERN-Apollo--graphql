import React, { Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import MenuBar from './components/Shared/MenuBar'
import { Container } from 'semantic-ui-react'
import { AuthProvider } from './context/authContext'

const LoginPage = React.lazy(() => import('./Pages/LoginPage/LoginPage'))
const RegisterPage = React.lazy(() => import('./Pages/RegisterPage/RegisterPage'))
const HomePage = React.lazy(() => import('./Pages/HomePage/HomePage'))

const App = () => {
  return (
    <>
      <AuthProvider>
        <Container>
          <Suspense fallback={<p>Loading...</p>}>
            <Router>
              <MenuBar />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
              </Switch>
            </Router>
          </Suspense>
        </Container>
      </AuthProvider>
    </>
  )
}

export default App
