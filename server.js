const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const session = require('express-session');
const initRoutes = require('./routes/routes');
const config = require('./config/db');

// Use Node's default promise instead of Mongoose's promise library
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(config.db);
let db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to the database.');
});

db.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

// Instantiate express
const app = express();

// Don't touch this if you don't know it
// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
app.enable('trust proxy');

// Set public folder using built-in express.static middleware
app.use(express.static('public')); 

// Set body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Enable cross-origin access through the CORS middleware
// NOTICE: For React development server only!
//if (process.env.CORS) {
console.log('USING CORS');
app.use(cors({credentials: true}));
//}

//use sessions for tracking login
app.use(session({
  secret: 'prometh3Um',
  resave: true,
  saveUninitialized: false
}));

// Init Routes
initRoutes(app);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});

// Start the server
const port = process.env.PORT || 3000;

const gitPort = process.env.GIT_PORT || 7500;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});