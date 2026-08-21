const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || process.env.LOCAL_MONGODB_URI || 'mongodb://127.0.0.1:27017/smartstock-ai-db';
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[MongoDB] Connected successfully to: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB] Primary connection failed: ${error.message}. Retrying with local MongoDB...`);
    try {
      const localUri = process.env.LOCAL_MONGODB_URI || 'mongodb://127.0.0.1:27017/smartstock-ai-db';
      const conn = await mongoose.connect(localUri);
      console.log(`[MongoDB] Connected successfully to local database: ${conn.connection.host}`);
    } catch (localErr) {
      console.error(`[MongoDB] Connection error: ${localErr.message}`);
    }
  }
};

module.exports = connectDB;
