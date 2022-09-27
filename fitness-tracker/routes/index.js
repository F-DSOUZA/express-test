var express = require('express');
var router = express.Router();
const { addWorkoutToDb, translateDbToCsv } = require('./utils/handler');

const db=[];

router.get('/', function(req, res, next) {
  const csv = translateDbToCsv(db)
  res.render('index', {title:csv})
});

router.post('/', function(req, res, next){
  addWorkoutToDb(db, req.body.items)
  res.send(db)
});

module.exports = router;
