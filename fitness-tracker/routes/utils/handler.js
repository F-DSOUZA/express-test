const { ReadError } = require("./errors/ReadError");
const { MonthValidationError } = require("./errors/MonthValidationError");
const { YearValidationError } = require("./errors/YearValidationError");
const { ValidationError } = require("./errors/ValidationError");

const {
  createAccount,
  createWorkout,
  getFilteredWorkoutsFromDb,
  getAccountFromDb,
  getWorkoutsFromDb,
} = require("./queries");

async function addWorkout(uuid, workout) {
  const workoutWithUUID = workout;
  workoutWithUUID.uuid = uuid;
  const { data, error } = await createWorkout(workoutWithUUID);
  if (data) {
    return data;
  }
  return error.message;
}

async function getWorkouts(uuid) {
  const { data } = await getWorkoutsFromDb(uuid);
  if (data && data.length) {
    return data;
  }
  throw new Error("could not retrieve data for this user");
}

async function translateDbToCsv(uuid) {
  const { data } = await getWorkoutsFromDb(uuid);
  if (data) {
    if (data.length) {
      const dbHeaders = [
        "user_name",
        "workout_type",
        "workout_date",
        "timestamp",
      ];
      const headerString = dbHeaders.join(",");
      const dbRowsToCsv = data.map((row) => Object.values(row).join(","));
      return [headerString, ...dbRowsToCsv].join("\r\n");
    }
    return [];
  }

  throw new Error();
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

async function filterWorkoutsByMonth(uuid, month, year) {
  try {
    validateDate(month, year);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    }
    throw err;
  }
  const { data } = await getFilteredWorkoutsFromDb(uuid, `${month}/${year}`);
  if (data) {
    if (data.length) {
      return data;
    }
    return null;
  }
  throw new Error();
}

async function addAccount(user) {
  const { data } = await createAccount(user);
  if (data && data.length) {
    return data;
  }
  // in what scenario would this fail and it better to throw error;
  throw new Error();
}

async function getAccount(uuid) {
  const { data } = await getAccountFromDb(uuid);
  if (data && data.length) {
    return data;
  }
  throw new Error();
}

module.exports = {
  getAccount,
  addWorkout,
  translateDbToCsv,
  filterWorkoutsByMonth,
  addAccount,
  getWorkouts,
};
