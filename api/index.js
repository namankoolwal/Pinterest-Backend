require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const connectDB = require("../utils/db");
const passport = require("passport");
const User = require("../models/user.model");
const flash = require("connect-flash");
const rateLimit = require("express-rate-limit");
const usersRouter = require("../routes/user.routes");
const postsRouter = require("../routes/posts.routes");
const boardRouter = require("../routes/board.routes");

// limit repeated requests to public APIs and/or endpoints 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  validate: {xForwardedForHeader: false}
});

const app = express();
connectDB();
app.use(limiter);

// view engine setup
app.set('views', path.join(__dirname, '../views')); // Adjust path to views directory
app.set('view engine', 'ejs');


// Express Session
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
);

// Flash middleware
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
  done(null, user._id); // Store the user ID in the session
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

// **************************************************************************
// for localStrategy
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// ***************************************************************************

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/", usersRouter);
app.use("/posts", postsRouter);
app.use("/board", boardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// // Catch-all route for handling 404 errors (unhandled routes)
// app.use((req, res, next) => {
//   res.status(404).send('Sorry, that route does not exist.');
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error =  err ;

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// module.exports = app;

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
