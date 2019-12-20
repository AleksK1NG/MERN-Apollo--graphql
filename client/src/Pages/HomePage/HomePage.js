import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_POSTS_QUERY } from './homePageQuery'

const HomePage = () => {
  const { loading, data, error } = useQuery(FETCH_POSTS_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  if (data) {
    console.log('data => ', data?.getAllPosts)
  }

  return (
    <div>
      <h2 style={{ paddingTop: '100px' }}>Home page 🚀</h2>
      {data && data?.getAllPosts.length}
    </div>
  )
}

export default HomePage
