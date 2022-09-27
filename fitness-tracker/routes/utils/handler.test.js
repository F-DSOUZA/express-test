const {addWorkoutToDb, translateDbToCsv} = require('./handler');
const testDb = [];
const testWorkout={"user_name":"Francesca", "workout_type":"run", "workout_date":"01/01/2022"};
const testCsv ="user_name,workout_type,workout_date\r\nFrancesca,run,01/01/2022";

test('post route handler adds a new row to db array',()=>{
    addWorkoutToDb(testDb, testWorkout);
    expect(testDb).toContain(testWorkout);
})

test('get route handler translates db array into csv format',()=>{
    const testDbWithValue = [testWorkout];
    expect(translateDbToCsv(testDbWithValue)).toEqual(testCsv);
});

test('get route handler returns message if db empty',()=>{
    expect(translateDbToCsv([])).toEqual("no workouts posted");
});