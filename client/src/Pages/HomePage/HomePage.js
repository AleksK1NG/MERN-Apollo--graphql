import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_POSTS_QUERY } from './homePageQuery'

import { Grid, Transition } from 'semantic-ui-react'
import PostCard from '../../components/Post/PostCard'
import { AuthContext } from '../../context/authContext'
import PostForm from '../../components/Post/PostForm'

const HomePage = () => {
  const { user } = useContext(AuthContext)
  const { loading, data, error } = useQuery(FETCH_POSTS_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  const posts = data?.getAllPosts

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>

      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group duration={500}>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  )
}

export default HomePage
