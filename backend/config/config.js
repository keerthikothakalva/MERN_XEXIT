const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI not found');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); 
  }
};

module.exports = connectMongoDB;
