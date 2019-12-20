const Post = require('../../models/Post')
const { checkAuth } = require('../../utils/check-auth')
const { AuthenticationError, UserInputError } = require('apollo-server')

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context)
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty',
          },
        })
      }

      const post = await Post.findById({ _id: postId })

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        })
        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context)

      const post = await Post.findOne({ _id: postId })

      if (post) {
        console.log(post.comments)
        const commentIndex = post.comments.findIndex((c) => c._id.toString() === commentId)
        console.log(commentIndex)
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1)
          await post.save()

          return post
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } else {
        throw new UserInputError('Post not found')
      }
    },
  },
}
