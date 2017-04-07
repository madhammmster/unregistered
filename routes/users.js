var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const User = require('../models/user');
const passport = require('passport');

const pauth = passport.authenticate.bind(passport);

function login (req, res) {
  const redirectTo = req.session.returnTo
    ? req.session.returnTo
    : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
}


const fail = {
  failureRedirect: '/login'
};

load = function(req, res, next, _id) {
  const criteria = { _id };
  try {
    req.profile = User.load({ criteria });
    if (!req.profile) return next(new Error('User not found'));

  } catch (err) {
    return next(err);
  }
  
  next();
}

signin = function () {};


session = login;
authCallback = login



/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.send('respond with a resource');
});


// user routes
router.get('/login', function (req, res) {
  res.render('users/login', {
    title: 'Login'
  })
});

router.get('/signup', function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

router.post('/users', function(req, res) {
  var user = new User(req.body);
  user.provider = 'local';
  
  try {
    user.save();

    // req.logIn(user, err => {
    //   if (err) req.flash('info', 'Sorry! We are not able to log you in!');
    //   return res.redirect('/');
    // });

  } catch (err) {

    res.send({
      title: 'Sign up',
      err,
      user
    });

    // const errors = Object.keys(err.errors)
    //   .map(field => err.errors[field].message);

    // res.render('users/signup', {
    //   title: 'Sign up',
    //   errors,
    //   user
    // });
  }

  // res.send(user);
});

router.post('/users/session',
  pauth('local', {
    failureRedirect: '/login',
    failureFlash: 'Invalid email or password.'
  }), session);



router.get('/users/:userId', function (req, res) {
  const user = req.profile;
  respond(res, 'users/show', {
    title: user.name,
    user: user
  });
});

router.get('/auth/facebook',
  pauth('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/login'
  }), signin);

router.get('/auth/facebook/callback', pauth('facebook', fail), authCallback);
router.get('/auth/github', pauth('github', fail), signin);
router.get('/auth/github/callback', pauth('github', fail), authCallback);
router.get('/auth/twitter', pauth('twitter', fail), signin);
router.get('/auth/twitter/callback', pauth('twitter', fail), authCallback);
router.get('/auth/google',
  pauth('google', {
    failureRedirect: '/login',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }), signin);
router.get('/auth/google/callback', pauth('google', fail), authCallback);
router.get('/auth/linkedin',
  pauth('linkedin', {
    failureRedirect: '/login',
    scope: [
      'r_emailaddress'
    ]
  }), signin);
router.get('/auth/linkedin/callback', pauth('linkedin', fail), authCallback);

router.param('userId', load);


module.exports = router;
