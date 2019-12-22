import React, { useCallback, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { DELETE_POST_MUTATION } from './deleteButtonMutation'
import { FETCH_POSTS_QUERY } from '../../Pages/HomePage/homePageQuery'
import { DELETE_COMMENT_MUTATION } from '../../Pages/PostPage/postPageMutations'

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const handleConfirm = useCallback(() => setConfirmOpen((prev) => (prev = !prev)), [confirmOpen])

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  const [deletePostOrMutation, { loading }] = useMutation(mutation, {
    variables: { postId, commentId },
    update(proxy, result) {
      setConfirmOpen(false)

      if (!commentId) {
        const cache = proxy.readQuery({ query: FETCH_POSTS_QUERY })

        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getAllPosts: cache.getAllPosts.filter((post) => post.id !== postId),
          },
        })
      }

      if (callback) callback()
    },
    onError(err) {
      console.error(err)
      setConfirmOpen(false)
    },
  })

  return (
    <>
      <Button as="div" color="red" floated="right" onClick={handleConfirm}>
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm open={confirmOpen} onCancel={handleConfirm} onConfirm={deletePostOrMutation} />
    </>
  )
}

export default DeleteButton
