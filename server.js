//DEPENDENCIES:

/* to load environment variables from an .env file into the process environment. The dotenv package is used to read the .env file and set the variables as key-value pairs in the process.env object, which provides access to environment variables within a Node.js application. */
require('dotenv').config();

//store the express module in the variable called express
const express = require('express');
const mongoose = require('mongoose');
const workoutRoute  = require('./routes/workoutRoute')
const userRoute  = require('./routes/userRoute')

//call the express function and store it in the variable called app
const app = express(); 


//MIDDLEWARE:

//any request that comes in, it looks for any body or data and attaches it to the request object
app.use(express.json());

//app.use() is a method that is used to register middleware functions. Middleware functions in Express.js are functions that have access to the request (req) and response (res) objects, and they can perform actions on these objects or modify them before passing control to the next middleware function in the chain.
//defines a middleware function that logs the request path (req.path) and the HTTP method (req.method) to the console. It is executed for every incoming request to the application.

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


//ROUTES:

//handles the route and requests to the server
//using root endpoint tio handle the request
//req is the request object
//res is the response object
//responds a JSON file

    // app.get('/', (req, res) => {
    //     res.json({msg: 'Welcome to the app!'});
    // });

//this attaches all of the workout routes to the app. it will be executed when the right path is accessed
app.use('/api/workouts', workoutRoute);   
app.use('/api/user', userRoute);   


//CONNECT to DATABASE
mongoose.connect(process.env.MONGO_URI)
.then(() => {

    //listen for requests using port 4000
    //at the same time it will run a function that will log a message regarding the request
    //used the key value pair in the .env file PORT=4000
    app.listen(process.env.PORT, () => {
    console.log('listening on port:',process.env.PORT); 
});

})
.catch((error) => {
    console.log(error);
})
