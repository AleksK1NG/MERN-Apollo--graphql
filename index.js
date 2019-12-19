const dotenv = require('dotenv')
const { ApolloServer, gql } = require('apollo-server')
const connectDB = require('./db/db')

// Load .env files
dotenv.config({ path: './config/config.env' })

connectDB()

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`

const resolvers = {
  Query: {
    sayHi: () => 'Apollo server =D',
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const PORT = process.env.PORT || 5000

server.listen({ port: PORT }).then((res) => {
  console.log(`Server is running on port: ${res.url}`)
})
