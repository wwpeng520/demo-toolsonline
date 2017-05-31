const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/beautify', function(req, res, next) {
  res.render('beautify');
});

router.get('/chinese2code', function(req, res, next) {
  res.render('chinese2code');
});

router.get('/encrypt', function(req, res, next) {
  res.render('encrypt');
});

router.get('/file-hash', function(req, res, next) {
  res.render('file-hash');
});

router.get('/hexconvert', function(req, res, next) {
  res.render('hexconvert');
});

router.get('/html-escape', function(req, res, next) {
  res.render('html-escape');
});

router.get('/ip-inquire', function(req, res, next) {
  res.render('ip-inquire');
});

router.get('/product', function(req, res, next) {
  res.render('product');
});

router.get('/weather', function(req, res, next) {
  res.render('weather');
});

router.get('/wordcounter', function(req, res, next) {
  res.render('wordcounter');
});

router.get('/xmorse', function(req, res, next) {
  res.render('xmorse');
});

module.exports = router;
