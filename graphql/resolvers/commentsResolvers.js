const User = require('../../models/User')
const Post = require('../../models/Post')
const { UserInputError } = require('apollo-server')
const { checkAuth } = require('../../utils/check-auth')

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
}
