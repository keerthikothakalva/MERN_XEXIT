const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('MONGODB_URI not found, skipping MongoDB connection');
      return; 
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    
  }
};

module.exports = connectMongoDB;
