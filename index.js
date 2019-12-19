const dotenv = require('dotenv')
const { ApolloServer, gql } = require('apollo-server')
const connectDB = require('./db/db')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

// Load .env files
dotenv.config({ path: './config/config.env' })

connectDB()

const server = new ApolloServer({ typeDefs, resolvers })

const PORT = process.env.PORT || 5000

server.listen({ port: PORT }).then((res) => {
  console.log(`Server is running on port: ${res.url}`)
})
