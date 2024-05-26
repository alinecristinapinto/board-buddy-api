import express from 'express';
import { config } from 'dotenv';

config();
const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello, BoardBuddy!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});