const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

exports.checkAuth = (context) => {
  const authHeader = context.req.headers.authorization

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1]
    console.log("token", token)
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      return user
    } catch (error) {
      throw new AuthenticationError('Invalid or expired token')
    }
    throw new AuthenticationError('Auth token must be Bearer token format')
  }

  throw new AuthenticationError('Auth header must be Bearer token format')
}
