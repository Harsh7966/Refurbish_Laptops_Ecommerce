const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

module.exports = connectDB;