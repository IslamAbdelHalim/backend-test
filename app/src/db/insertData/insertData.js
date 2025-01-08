import dotenv from 'dotenv';
import fs from 'fs';
import mongoose from 'mongoose';

import Product from '../../models/product.model.js';

dotenv.config({ path: '../../../.env' });

const connectionURI = process.env.connectionURI;

const connectToMongoDB = async () => {
  await mongoose.connect(connectionURI);
  console.log('connected successfully');
};

await connectToMongoDB();

async function insertDataToMongo() {
  const data = fs.readFileSync('dummyData.json', 'utf8');
  const dataObj = JSON.parse(data);

  await Product.insertMany(dataObj);
  console.log('data inserted successfully');
  process.exit(1);
}

if (process.argv[2] === 'insertData') {
  insertDataToMongo();
}
