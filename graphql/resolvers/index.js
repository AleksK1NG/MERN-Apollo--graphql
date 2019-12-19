const postsResolvers = require('./postsResolvers')
const userResolvers = require('./userResolvers')

module.exports = {
  Query: {
    // ...userResolvers.Query,
    ...postsResolvers.Query,
  }
}