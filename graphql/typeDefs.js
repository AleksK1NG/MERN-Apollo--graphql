const { gql } = require('apollo-server')

module.exports = gql`
  type Post {
    id: ID!
    username: String!
    createdAt: String!
    body: String!
  }

  type Query {
    getAllPosts: [Post]
  }
`
