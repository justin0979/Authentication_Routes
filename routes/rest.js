const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      Material = require('../models/material');

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/login');
}

// Index Route
router.get('/index', isLoggedIn, (req, res) => {
  Material.find({})
  .then(foundMaterial => res.render('meat/index', { material: foundMaterial }))
  .catch(err => res.render('meat/error', { err: err }));
});

// New Route
router.get('/index/new', (req, res) => res.render('new'));

// Create Route
router.post('/index', isLoggedIn, (req, res) => {
  Material.create(req.body.material)
  .then(newMaterial => res.redirect('/index'))
  .catch(err => res.render('meat/error', { err: err }));
});

module.exports = router;
