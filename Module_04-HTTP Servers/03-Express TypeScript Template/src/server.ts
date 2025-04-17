import express from 'express';

const app = express();
const PORT = 3000;

app.get('/ping', async(req, res) => {
  res.send("pong");
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Press Ctrl + C to stop the server');
})