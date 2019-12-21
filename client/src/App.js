import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import MenuBar from './components/Shared/MenuBar'
import { Container } from 'semantic-ui-react'
import { AuthProvider } from './context/authContext'

import './App.css'
import 'semantic-ui-css/semantic.min.css'

const Routes = React.lazy(() => import('./Routes/routes'))

const App = () => {
  return (
    <>
      <AuthProvider>
        <Container>
          <Suspense fallback={<p>Loading...</p>}>
            <Router>
              <MenuBar />
              <Routes />
            </Router>
          </Suspense>
        </Container>
      </AuthProvider>
    </>
  )
}

export default App
