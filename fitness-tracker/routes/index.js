var cors = require('cors')
var express = require('express')
var router = express.Router();
router.use(cors())
const {   addWorkoutToDb,
  translateDbToCsv,
  filterWorkoutsByMonth } = require('./utils/handler');

const db=[];

router.get('/', function(req, res) {
    if(req.headers.format ==='csv'){
        return res.send(translateDbToCsv(db));
    }
    return res.send(db);
});

router.post('/', function(req, res){ 
    addWorkoutToDb(db, req.body);
    res.send(db)
});

router.get('/filter', function(req, res) {
    const {month, year} =req.query;
    const filteredWorkouts = filterWorkoutsByMonth(db, month, year)
    if(req.headers.format ==='csv'){
      res.send(translateDbToCsv(db));
    }
    res.send(filteredWorkouts);
});

module.exports = router;
