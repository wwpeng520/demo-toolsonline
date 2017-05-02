const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('chinese2code');
});

module.exports = router;
