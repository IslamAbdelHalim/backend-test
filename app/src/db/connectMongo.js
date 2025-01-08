import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './.env' });

const connectionURI = process.env.connectionURI;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(connectionURI);
    console.log('connected successfully to mongodb');
  } catch (err) {
    console.log(err.stack);
  }
};

export default connectMongoDB;
