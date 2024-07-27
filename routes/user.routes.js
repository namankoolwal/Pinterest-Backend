const express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user.model');
const upload = require('../utils/multer');
const isLoggedIn = require('../middleware/isLoggedIn');

// for localStrategy
    // const localStrategy = require('passport-local');
    // passport.use(new localStrategy(User.authenticate()));

const {
  home,
  register,
  login,
  profile,
  logout,
  feed,
  avatarupload
} = require('../controllers/user.controller');

// Middleware to check if user is logged in


// Post login setup
const postLogin = passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
});

// Route Definitions
router.route('/')
  .get(feed);

router.route('/register')
.get(home)

router.route('/register')
  .post(register);

router.route('/login')
  .get(login)
  .post(postLogin);

router.route('/profile')
  .get(isLoggedIn, profile);

router.route('/logout')
  .get(logout);

router.route('/feed')
  .get(feed);


router.route('/avatarupload')
.post(isLoggedIn , upload.single('avatar') , avatarupload)


module.exports = router;
