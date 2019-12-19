const postsResolvers = require('./postsResolvers')
const userResolvers = require('./userResolvers')

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postsResolvers.Mutation
  }
}