const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config({path: './config/config.env'})
const mongoose = require('mongoose')
const passport = require('passport')
const session  = require('express-session')
const MongoStore = require('connect-mongo')(session)

const {connectMongoose} = require('./config/db');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');


const app = express();

// Authentication with passport
const {local} = require('./config/passport')

const PORT = process.env.PORT

// Start Database Connection
connectMongoose();

// Authentication Strategies
local(passport)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.set('view engine', 'html');

process.env.NODE_ENV==="development"  && app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "My secret Key",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
    res.user = req.user
    return next()})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () =>{console.log(`Listening at port ${PORT}`)
});
module.exports = app;
