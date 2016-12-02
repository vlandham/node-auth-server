var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.redirect('http://proquest-vector-client.s3-website-us-east-1.amazonaws.com/client/');
  res.render('index', { title: 'Express' });
});

module.exports = router;
