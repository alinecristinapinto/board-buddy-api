import express from 'express';

const app = express ();
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, BoardBuddy!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});