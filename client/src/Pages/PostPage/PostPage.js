import React, { useContext, useRef, useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { Button, Card, Form, Grid, Image, Icon, Label } from 'semantic-ui-react'
import LikeButton from '../../components/LikeButton/LikeButton'
import { AuthContext } from '../../context/authContext'
import { useParams, useHistory } from 'react-router-dom'
import { FETCH_POST_QUERY } from './postPageQuery'
import DeleteButton from '../../components/DeleteButton/DeleteButton'
import { SUBMIT_COMMENT_MUTATION } from './postPageMutations'

const PostPage = () => {
  const { user } = useContext(AuthContext)
  const { postId } = useParams()
  const history = useHistory()
  const commentInputRef = useRef(null)
  const [comment, setComment] = useState('')

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  })

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    variables: { postId, body: comment },
    update(proxy, result) {
      setComment('')
      commentInputRef.current.blur()
    },
    onError(err) {
      console.error(err)
    },
  })

  function deletePostCallback() {
    history.push('/')
  }

  if (loading || !data?.getSinglePost) return <p>Loading post..</p>
  const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = data.getSinglePost

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" size="small" float="right" />
        </Grid.Column>

        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>

            <hr />

            <Card.Content extra>
              <LikeButton user={user} post={{ id, likeCount, likes }} />
              <Button as="div" labelPosition="right" onClick={() => console.log('Comment on post')}>
                <Button basic color="blue">
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
              {user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback} />}
            </Card.Content>
          </Card>
          {user && (
            <Card fluid>
              <Card.Content>
                <p>Post a comment</p>

                <Form>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="Comment.."
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      ref={commentInputRef}
                    />

                    <button type="submit" className="ui button teal" disabled={comment.trim() === ''} onClick={submitComment}>
                      Submit
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {user && user.username === comment.username && <DeleteButton postId={id} commentId={comment.id} />}

                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default PostPage
