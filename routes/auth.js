const express   = require('express'),
      passport  = require('passport'),
      router    = express.Router(),
      User      = require('../models/user');

router.get('/register', (req, res) => res.render('auth/register'));

router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password)
  .then(user => res.render('meat/index'))
  .catch(err => res.redirect('/login'));
});

router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/login'
  }), (req, res) => {});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
