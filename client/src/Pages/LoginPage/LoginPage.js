import React, { useContext, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN_USER } from './loginPageMutations'
import { Button, Form } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const initialState = {
  email: '',
  password: '',
}

const LoginPage = () => {
  const authContext = useContext(AuthContext)
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const { values, onChange, onSubmit, resetForm } = useForm(loginUser, initialState)

  const [userLogin, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data }) {
      authContext.loginUser(data.login)
      history.push('/')
    },
    variables: values,
    onError(err) {
      console.error(err)
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
  })

  function loginUser() {
    userLogin()
    resetForm()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary disabled={loading}>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LoginPage
