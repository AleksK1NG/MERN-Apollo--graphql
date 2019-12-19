const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

module.exports = {
  Mutation: {
    async register(parent, args, context, info) {
      const {
        registerInput: { username, email, password, confirmPassword },
      } = args

      try {
        // const checkUser = await User.find({ email })
        // if (checkUser) return

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({ email, username, password: hashedPassword, createdAt: new Date().toISOString() })

        const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' })

        console.log(' user ', user._doc)

        return {
          ...user._doc,
          id: user.id,
          token,
        }
      } catch (e) {
        console.error(e)
        throw new Error(e)
      }
    },
  },
}
