var express = require('express');
var { format } = require('date-fns');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const todaysDate = format(new Date(), 'dd/MM/yy')
  res.render('index', { title: 'Today\'s date', date: todaysDate });
});

module.exports = router;
