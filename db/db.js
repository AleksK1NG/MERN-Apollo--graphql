const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    console.log(`MongoDB Connected: ${connection.connection.host}`)
  } catch (error) {
    console.error(error)
  }
}

module.exports = connectDB