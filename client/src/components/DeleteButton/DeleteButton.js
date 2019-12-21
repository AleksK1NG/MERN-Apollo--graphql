import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { DELETE_POST_MUTATION } from './deleteButtonMutation'
import { FETCH_POSTS_QUERY } from '../../Pages/HomePage/homePageQuery'

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [deletePost, { loading }] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId },
    update(proxy, result) {
      setConfirmOpen(false)

      const cache = proxy.readQuery({ query: FETCH_POSTS_QUERY })
      // cache.getAllPosts = cache.getAllPosts.filter(post => post.id !== postId)
      console.log('delete button cache => ', cache)

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getAllPosts: cache.getAllPosts.filter((post) => post.id !== postId),
        },
      })
      if (callback) callback()
    },
  })

  return (
    <>
      <Button as="div" color="red" floated="right" onClick={deletePost}>
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} />
    </>
  )
}

export default DeleteButton