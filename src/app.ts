import express from 'express';
import { config } from 'dotenv';
import { setupRoutes } from './routes';

config();

const app = express();
app.use(express.json());
setupRoutes(app);

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello, BoardBuddy!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
