
function addWorkoutToDb(db, workout){
    db.push(workout)
}

function translateDbToCsv(db){
    if (db.length){
        const dbHeaders=["user_name", "workout_type", "workout_date"]
        const headerString =  dbHeaders.join(',');
        const dbRowsToCsv = db.map(row =>  Object.values(row).join(',') )
        return [headerString, ...dbRowsToCsv].join('\r\n')
    }
    return "no workouts posted";
};

module.exports = {
  addWorkoutToDb,
  translateDbToCsv,
};