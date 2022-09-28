var express = require('express');
var router = express.Router();
const { addWorkoutToDb, translateDbToCsv, translateDbToCsvByMonth } = require('./utils/handler');

const db=[];

router.get('/', function(req, res, next) {
  const csv = translateDbToCsv(db)
  res.render('index', {title:csv})
});

router.post('/', function(req, res, next){ 
  addWorkoutToDb(db, req.body.items)
  res.send(db)
});

router.get('/filter', function(req, res, next) {
  const {month, year} =req.query;
  const workout = translateDbToCsvByMonth(db, month, year)
  res.render('index', {title: workout})
});

module.exports = router;
