const express = require('express');

// Create an app
const app = express();

app.get('/', (req, res) => {
  //res.status(200).send("Hello from the server side");
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natoures' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});
const port = 3000;
app.listen(port, () => {
  console.log(`App is running...`);
});
