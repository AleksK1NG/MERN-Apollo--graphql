import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER_USER } from './registerPageMutations'
import { Button, Form } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const RegisterPage = () => {
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const { values, onChange, onSubmit, resetForm } = useForm(registerUser, initialState)

  const [addUser, { loading, error }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result)
      history.push('/')
    },
    variables: values,
    onError(err) {
      console.error(err)
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
  })

  function registerUser() {
    addUser()
    resetForm()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary disabled={loading}>
          Register
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

export default RegisterPage
