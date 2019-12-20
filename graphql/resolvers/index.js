const postsResolvers = require('./postsResolvers')
const userResolvers = require('./userResolvers')
const commentsResolvers = require('./commentsResolvers')

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
}
