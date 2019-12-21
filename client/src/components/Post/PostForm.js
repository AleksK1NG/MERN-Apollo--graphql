import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from '../../hooks/useForm'

import { CREATE_POST_MUTATION } from './postMutations'

const initialState = {
  body: '',
}

const PostForm = () => {
  const { values, onChange, onSubmit, resetForm } = useForm(createPostCallback, initialState)
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      console.log(result)
    },
    onError(err) {
      console.error(err)
    },
    variables: values,
  })

  function createPostCallback() {
    createPost()
    resetForm()
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input placeholder="Message" name="body" onChange={onChange} value={values.body} />
        <Button type="submit" color="teal" disabled={loading}>
          Submit
        </Button>
      </Form.Field>
    </Form>
  )
}

export default PostForm
