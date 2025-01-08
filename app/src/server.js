import cors from 'cors';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';

import appRouter from './routes/index.router.js';

import {
  globalErrorHandling,
  notFoundErrorHandling,
} from './utils/catchError.js';

const app = express();

app.use(express.json());

app.use(helmet());

app.use(xss());

app.use(mongoSanitize());

app.use(cors());

app.use('/api', appRouter);

app.use(notFoundErrorHandling);

app.use(globalErrorHandling);

export default app;
