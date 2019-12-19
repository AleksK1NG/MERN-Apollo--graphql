const dotenv = require('dotenv')
const { ApolloServer, gql } = require('apollo-server')
const connectDB = require('./db/db')

// Load .env files
dotenv.config({ path: './config/config.env' })

connectDB()

const Post = require('./models/Post')

const typeDefs = gql`
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

const resolvers = {
  Query: {
    getAllPosts: async () => {
      try {
        const posts = await Post.find()

        return posts
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const PORT = process.env.PORT || 5000

server.listen({ port: PORT }).then((res) => {
  console.log(`Server is running on port: ${res.url}`)
})
