var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('health', { title: 'Health Check', status: 'Everything is okily dokily' });
});

module.exports = router;
