import dotenv from 'dotenv';

import connectMongoDB from './src/db/connectMongo.js';
import server from './src/server.js';

dotenv.config();

(async function () {
  await connectMongoDB();

  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || 'localhost';

  server.listen(PORT, HOST, () => {
    console.log('server is running successfully');
  });
})();
