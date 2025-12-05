require('dotenv').config(); //gets info from .env
const express = require('express'); // express framework for server and routing
const mongoose = require('mongoose'); // mongoose for MongoDB interaction
const methodOverride = require('method-override'); // to support PUT and DELETE methods
const planRoutes = require('./routes/plan');

const app = express(); // create express app

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB')) //when connected prints this
.catch(err => console.error('MongoDB connection error:', err)); //when not connected prints this

// EJS as the templating engine
app.set('view engine', 'ejs'); //set EJS as the template
app.use(express.static('public')); //gets files for public folder
app.use(express.urlencoded({ extended: true })); //
app.use(methodOverride('_method'));

// import routes
app.use('/', planRoutes);

const PORT = process.env.PORT || 3000; //set port from .env or default to 3000
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});