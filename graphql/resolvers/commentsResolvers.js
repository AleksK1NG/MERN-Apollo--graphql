const User = require('../../models/User')
const Post = require('../../models/Post')
const { checkAuth } = require('../../utils/check-auth')
const { AuthenticationError, UserInputError } = require('apollo-server')

module.exports = {
  Mutation: {
    createComment: async (parent, { body, postId }, ctx, info) => {
      try {
        const { username } = checkAuth(ctx)
        if (body.trim === '')
          throw new UserInputError('Comment must not be empty', {
            errors: { body: 'Comment must not be empty' },
          })

        const post = await Post.findById(postId)
        if (!post) throw new Error(`Post with id ${postId} not found`)

        post.comments.unshift({ body, username, createdAt: new Date().toISOString() })
        await post.save()

        return post
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    },
  },

  deleteComment: async (parent, { commentId, postId }, ctx, info) => {
    try {
      const { username } = checkAuth(ctx)

      const post = await Post.findById(postId)
      if (!post) throw new UserInputError(`Post with id ${postId} not found`)

      const commentIndex = post.comments.findIndex((c) => c.id === commentId)
      if (post.comments[commentIndex].username !== username) throw new AuthenticationError('Unauthorized')

      post.comments = post.comments.splice(commentId, 1)
      await post.save()

      return post
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  },
}
