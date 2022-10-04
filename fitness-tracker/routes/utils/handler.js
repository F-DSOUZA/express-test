const {format} = require('date-fns')

function addWorkoutToDb(db, workout){    
    const workoutWithDate= workout;
    workoutWithDate.timestamp = format(new Date(), 'dd/MM/yy');
    db.push(workoutWithDate)
}

function translateDbToCsv(db){
    if (db.length){
        const dbHeaders=["user_name", "workout_type", "workout_date", "timestamp"]
        const headerString =  dbHeaders.join(',');
        const dbRowsToCsv = db.map(row =>  Object.values(row).join(',') )
        return [headerString, ...dbRowsToCsv].join('\r\n')
    }
    return "no workouts posted";
};

function filterWorkoutsByMonth(db, MM, YY){
//year has to be in YYYY format
    const filterDate= MM.length===1? [`0${MM}`,YY ]:[MM, YY];

    const filteredWorkouts = db.filter((workout)=> {
        const workoutDate = workout.workout_date.slice(3).split('/');
        if(workoutDate[0]===filterDate[0] && workoutDate[1]===filterDate[1] ){
            return workout
        }
    return null
    })
  return  filteredWorkouts? filteredWorkouts:`no workouts posted in ${format(new Date(YY, MM, '00'),'MMMMMMM yyyy')}`
}

module.exports = {
  addWorkoutToDb,
  translateDbToCsv,
  filterWorkoutsByMonth,
};