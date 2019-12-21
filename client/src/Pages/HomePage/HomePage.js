import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_POSTS_QUERY } from './homePageQuery'

import { Grid } from 'semantic-ui-react'
import PostCard from '../../components/Post/PostCard'

const HomePage = () => {
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
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          posts?.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  )
}

export default HomePage
