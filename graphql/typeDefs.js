const { gql } = require('apollo-server')

module.exports = gql`
  type Post {
    id: ID!
    username: String!
    createdAt: String!
    body: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    createdAt: String!
    username: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getAllPosts: [Post]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
  }
`
