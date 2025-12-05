require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');

const planRoutes = require('./routes/plan');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Passport Config
require('./config/passport')(passport);

// MongoDB Connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// EJS Setup
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Sessions
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// ⭐ Make user available everywhere
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use('/', planRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
