const dotenv = require('dotenv')
const { ApolloServer, PubSub } = require('apollo-server')
const connectDB = require('./db/db')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

// Load .env files
dotenv.config({ path: './config/config.env' })

connectDB()

const pubsub = new PubSub()

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => ({ req, pubsub }) })

const PORT = process.env.PORT || 5000

server.listen({ port: PORT }).then((res) => {
  console.log(`Server is running on port: ${res.url}`)
})
