import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from '../src/adapters/controller/routes';
import { errorHandler } from './config/middleware/error-handler';

dotenv.config();

const PORT = process.env.PORT || 8000;
const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

RegisterRoutes(app);

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
      explorer: true,
    },
  }),
);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello, BoardBuddy!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
