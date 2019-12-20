const postsResolvers = require('./postsResolvers')
const userResolvers = require('./userResolvers')
const commentsResolvers = require('./commentsResolvers')

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...postsResolvers.Mutation,
  }
}