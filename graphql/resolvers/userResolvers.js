const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const { UserInputError } = require('apollo-server')
const { validateLoginInput, validateRegisterInput } = require('../../utils/validators')

module.exports = {
  Mutation: {
    async register(parent, args, context, info) {
      const {
        registerInput: { username, email, password, confirmPassword },
      } = args

      console.log(password, confirmPassword)
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
      if (!valid) throw new UserInputError('Errors', { errors })

      const checkUser = await User.findOne({ email })
      if (checkUser)
        throw new UserInputError(`User with email ${email} already exits`, {
          errors: {
            email: `User with email ${email} already exits`,
          },
        })

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = await User.create({ email, username, password: hashedPassword, createdAt: new Date().toISOString() })

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      )

      console.log(' user ', user._doc)

      return {
        ...user._doc,
        id: user.id,
        token,
      }
    },
  },
}
