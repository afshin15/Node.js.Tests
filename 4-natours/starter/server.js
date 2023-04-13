const mongoose = require('mongoose');
const dotenv = require('dotenv');

//define environment variables configuration
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('FB Connectionm successfull');
  });

const app = require('./app');

//console.log(process.env);

//Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running... on port ${port}`);
});

//const x = 23;
//x = 66;
