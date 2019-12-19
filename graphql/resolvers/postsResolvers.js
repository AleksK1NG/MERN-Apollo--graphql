const Post = require('../../models/Post')

module.exports = {
  Query: {
    getAllPosts: async () => {
      try {
        const posts = await Post.find()

        return posts
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    },
  },
}
