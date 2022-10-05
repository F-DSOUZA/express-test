/* eslint-disable no-undef */
const { format } = require("date-fns");
const {
  addWorkoutToDb,
  translateDbToCsv,
  filterWorkoutsByMonth,
  getAccountData,
} = require("./handler");
const { ReadError } = require("./errors/ReadError");
const { MonthValidationError } = require("./errors/MonthValidationError");
const { YearValidationError } = require("./errors/YearValidationError");
const { UserValidationError } = require("./errors/UserValidationError");

const currentDate = format(new Date(), "dd/MM/yy");

const testDb = [];
const testWorkout = {
  user_name: "Francesca",
  workout_type: "run",
  workout_date: "01/01/2022",
  timestamp: currentDate,
};

const testWorkout2 = {
  user_name: "Francesca",
  workout_type: "swim",
  workout_date: "01/02/2022",
  timestamp: currentDate,
};

const testCsv = `user_name,workout_type,workout_date,timestamp\r\nFrancesca,run,01/01/2022,${currentDate}`;

const testAccount1 = {
  uuid: 1234,
  firstname: "Francesca",
  lastname: "D'Souza",
};
const testAccount2 = { uuid: 2345, firstname: "Rui", lastname: "Ramos" };
const testAccounts = [testAccount1, testAccount2];

const MonthReadError = new ReadError(
  "Validation Error",
  new MonthValidationError()
);
const YearReadError = new ReadError(
  "Validation Error",
  new YearValidationError()
);
const userNotFoundError = new ReadError(
  "Validation Error",
  new UserValidationError()
);

test("post route handler adds a new row to db array", () => {
  addWorkoutToDb(testDb, testWorkout);
  expect(testDb).toContain(testWorkout);
});

test("get route handler translates db array into csv format", () => {
  const testDbWithValue = [testWorkout];
  expect(translateDbToCsv(testDbWithValue)).toEqual(testCsv);
});

test("get route handler returns message if db empty", () => {
  expect(translateDbToCsv([])).toEqual([]);
});

test("get filter route handler returns csv containing workouts for specified month", () => {
  expect(
    filterWorkoutsByMonth([testWorkout, testWorkout2], "01", "2022")
  ).toEqual([testWorkout]);
});

test("get filter route handler returns error message if no workouts found", () => {
  expect(
    filterWorkoutsByMonth([testWorkout, testWorkout2], "03", "2022")
  ).toEqual([]);
});

test("if the year is not in the correct format, when filtering, throw an error", () => {
  expect(() =>
    filterWorkoutsByMonth([testWorkout, testWorkout2], "03", "20")
  ).toThrow(YearReadError);
});

test("if the month is not in the correct format, when filtering, throw an error", () => {
  expect(() =>
    filterWorkoutsByMonth([testWorkout, testWorkout2], "3", "2020")
  ).toThrow(MonthReadError);
});

// Rui -  why does this pass with any error type?
test.only("invalid user error is thrown when uuid is not in the db", () => {
  expect(() => getAccountData(testAccounts, 5678).toThrow(userNotFoundError));
});

test("account data is returned when valid uuid is given", () => {
  expect(getAccountData(testAccounts, 1234)).toEqual(testAccount1);
});
