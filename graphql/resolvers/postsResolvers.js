const Post = require('../../models/Post')
const { checkAuth } = require('../../utils/check-auth')
const { AuthenticationError } = require('apollo-server')

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
  },
}
