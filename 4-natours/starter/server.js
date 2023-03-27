const dotenv = require('dotenv');

//define environment variables configuration
dotenv.config({ path: './config.env' });

const app = require('./app');

//console.log(process.env);

//Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running... on port ${port}`);
});

//const x = 23;
//x = 66;
