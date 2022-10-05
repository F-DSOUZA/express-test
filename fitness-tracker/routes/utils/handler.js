const { format } = require("date-fns");
const { ReadError } = require("./errors/ReadError");
const { MonthValidationError } = require("./errors/MonthValidationError");
const { YearValidationError } = require("./errors/YearValidationError");
const { ValidationError } = require("./errors/ValidationError");

function addWorkoutToDb(db, workout) {
  const workoutWithDate = workout;
  workoutWithDate.timestamp = format(new Date(), "dd/MM/yy");
  db.push(workoutWithDate);
}

function translateDbToCsv(db) {
  if (db.length) {
    const dbHeaders = [
      "user_name",
      "workout_type",
      "workout_date",
      "timestamp",
    ];
    const headerString = dbHeaders.join(",");
    const dbRowsToCsv = db.map((row) => Object.values(row).join(","));
    return [headerString, ...dbRowsToCsv].join("\r\n");
  }
  return [];
}

function validateDate(month, year) {
  if (month.length !== 2) {
    throw new MonthValidationError();
  }
  if (year.length !== 4) {
    // year has to be in YYYY format
    throw new YearValidationError();
  }
}

function filterWorkoutsByMonth(db, month, year) {
  try {
    validateDate(month, year);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    }
    throw err;
  }

  const filterDate = [month, year];
  const filteredWorkouts = db.filter((workout) => {
    const workoutDate = workout.workout_date.slice(3).split("/");
    if (workoutDate[0] === filterDate[0] && workoutDate[1] === filterDate[1]) {
      return workout;
    }
    return null;
  });
  return filteredWorkouts || [];
}

module.exports = {
  addWorkoutToDb,
  translateDbToCsv,
  filterWorkoutsByMonth,
};
