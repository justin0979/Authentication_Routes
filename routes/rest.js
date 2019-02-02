const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      Material = require('../models/material'),
      expressSanitizer = require('express-sanitizer'),
      methodOverride = require('method-override');

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/login');
}

// Index Route
router.get('/index', (req, res) => {
  Material.find({})
  .then(foundMaterial => res.render('meat/index', { material: foundMaterial }))
  .catch(err => res.render('meat/error', { err: err }));
});

// New Route
router.get('/index/new', isLoggedIn, (req, res) => res.render('meat/new'));

// Create Route
router.post('/index', isLoggedIn, (req, res) => {
  Material.create(req.body.material)
  .then(newMaterial => res.redirect('/index'))
  .catch(err => res.render('meat/error', { err: err }));
});

// Show Route
router.get('/index/:id', (req, res) => {
  Material.findById(req.params.id)
    .then(material => res.render(`meat/show`, { material: material }))
    .catch(err => console.log(err));
});

// Edit Route
router.get('/index/:id/edit', isLoggedIn, (req, res) => {
  Material.findById(req.params.id)
  .then(material => res.render(`meat/edit`, { material: material }))
  .catch(err => res.render('meat/error'));
});

// Update Route
router.put('/index/:id', isLoggedIn, (req, res) => {
  req.body.material.description = req.sanitize(req.body.material.description);

  Material.findByIdAndUpdate(req.params.id, req.body.material, (err, updatedMaterial) => {
    if(err) res.render('meat/error', { err: err });
    else res.redirect(`/index/${req.params.id}`);
  });
});

// Delete Route
/*
router.delete('index/:id', (req, res) => {
  Material.findByIdAndDelete(req.params.id)
  .then(deletedMaterial => res.redirect('/index'))
  .catch(err => res.render('meat/error', { err: err }));
});
*/
router.delete('/index/:id', (req, res) => {
  Material.findByIdAndDelete(req.params.id)
  .exec((err, deletedMaterial) => {
    if(err) res.render('meat/error', { err: err });
    else res.redirect('/index');
  });
});

module.exports = router;
