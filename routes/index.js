const express = require('express'),
      router = express.Router();

router.get('/', (req, res) => res.render('meat/home'));

module.exports = router;
