import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { Button, Card, Grid, Image, Icon, Label } from 'semantic-ui-react'
import LikeButton from '../../components/LikeButton/LikeButton'
import { AuthContext } from '../../context/authContext'
import { useParams, useHistory } from 'react-router-dom'
import { FETCH_POST_QUERY } from './postPageQuery'
import DeleteButton from '../../components/DeleteButton/DeleteButton'

const PostPage = () => {
  const { user } = useContext(AuthContext)
  const { postId } = useParams()
  const history = useHistory()

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
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
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default PostPage
