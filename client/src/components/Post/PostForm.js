import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from '../../hooks/useForm'

import { CREATE_POST_MUTATION } from './postMutations'
import { FETCH_POSTS_QUERY } from '../../Pages/HomePage/homePageQuery'
import { client } from '../../ApolloProvider/ApolloProvider'

const initialState = {
  body: '',
}

const PostForm = () => {
  const { values, onChange, onSubmit, resetForm } = useForm(createPostCallback, initialState)
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const cache = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      })

      client.cache.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getAllPosts: [result.data.createPost, ...cache.getAllPosts],
        },
      })
    },
    onError(err) {
      console.error(err)
    },
  })

  function createPostCallback() {
    createPost()
    resetForm()
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal" disabled={loading}>
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  )
}

export default PostForm
