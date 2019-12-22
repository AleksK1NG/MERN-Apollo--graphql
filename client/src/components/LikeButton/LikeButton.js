import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Button, Label, Icon } from 'semantic-ui-react'
import { LIKE_POST_MUTATION } from './likePostMutation'
import MyPopup from '../Shared/ItemPopup'

const LikeButton = ({ user, post }) => {
  const { id, likeCount, likes } = post

  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [user, likes])

  const [likePost, { loading }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {
      console.error(err)
    },
  })

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <MyPopup content={liked ? 'Unlike' : 'Like'}>
        {user ? (
          liked ? (
            <Button color="teal" disabled={loading}>
              <Icon name="heart" />
            </Button>
          ) : (
            <Button color="teal" basic disabled={loading}>
              <Icon name="heart" />
            </Button>
          )
        ) : (
          <Button as={Link} to="/login" color="teal" basic disabled={loading}>
            <Icon name="heart" />
          </Button>
        )}
      </MyPopup>

      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  )
}

export default LikeButton
