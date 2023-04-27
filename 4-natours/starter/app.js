const express = require('express');
const morgan = require('morgan'); // a third party middleware

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//const { CLIENT_RENEG_LIMIT } = require('tls');

// Create an app
const app = express();

//Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
{
  // This middle ware add infromation about the request to the consol
  app.use(express.json()); // Middleware
}
app.use(express.static(`${__dirname}/public`)); // Static files (from  folder not from a route)

//Middleware (apply ro every single request)
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Route handlers

/* app.get('/', (req, res) => {
  //res.status(200).send("Hello from the server side");
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natoures' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
}); */

//app.get('/api/v1/tours', getAllTours);
//app.get('/api/v1/tours/:id', getTour);
//app.post('/api/v1/tours', createTour);
//PATCH ONLY SEND THE PROPERTY TO update (not whole item) - not completed here
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);

//Better way
//Routes

app.use('/api/v1/tours', tourRouter); // a middleware to have specific routs
app.use('/api/v1/users', userRouter); // a middleware to have specific routs
/* app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
 */

//Handle all unhandeled  urls (and routes)
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalURL} on this server!`,
  //});
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
