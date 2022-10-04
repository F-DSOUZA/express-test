const { format } = require('date-fns');
const { addWorkoutToDb,translateDbToCsv, filterWorkoutsByMonth,} = require('./handler');

const currentDate = format(new Date(), 'dd/MM/yy');

const testDb = [];
const testWorkout = {
    "user_name":"Francesca", 
    "workout_type":"run", 
    "workout_date":"01/01/2022",
    "timestamp":currentDate
};

const testWorkout2 = {
    "user_name":"Francesca", 
    "workout_type":"swim", 
    "workout_date":"01/02/2022",
    "timestamp":currentDate
};

const testCsv =`user_name,workout_type,workout_date,timestamp\r\nFrancesca,run,01/01/2022,${currentDate}`;

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

test('get filter route handler returns csv containing workouts for specified month',()=>{
    expect(filterWorkoutsByMonth([testWorkout, testWorkout2], '01','2022')).toEqual([testWorkout]);
});

test('get filter route handler returns error message if no workouts found',()=>{
    expect(filterWorkoutsByMonth([testWorkout, testWorkout2], '03','2022')).toEqual([]);
});