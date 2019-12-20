const Post = require('../../models/Post')
const { checkAuth } = require('../../utils/check-auth')
const { AuthenticationError, UserInputError } = require('apollo-server')

module.exports = {
  Query: {
    getAllPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 })

        return posts
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    },

    getSinglePost: async (parent, { postId }, context, info) => {
      try {
        const post = await Post.findById({ _id: postId })
        if (!post) throw new Error(`Post with id ${postId} not found`)

        return post
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    },
  },

  Mutation: {
    createPost: async (parent, { body }, context, info) => {
      try {
        const user = checkAuth(context)

        const post = await Post.create({ body, user: user.id, username: user.username, createdAt: new Date().toISOString() })

        await context.pubsub.publish('NEW_POST', {
          newPost: post,
        })

        return post
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    },

    deletePost: async (parent, { postId }, context, info) => {
      try {
        const user = checkAuth(context)

        const post = Post.findById(postId)
        if (!post) throw new Error(`Post with id ${postId} not found`)
        if (!post.username === user.username) throw new AuthenticationError('Unauthorized')

        await Post.findOneAndDelete({ _id: postId })
        return `Post with id ${postId} successfully deleted`
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    },

    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context)

      const post = await Post.findOne({ _id: postId })
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username)
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          })
        }

        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    },
  },

  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST'),
    },
  },
}
