const dbClient = require("../../infrastructure/dbClient");
const { ReadError } = require("./errors/ReadError");

// invalid data passed to the db
// db connection lost

async function createWorkout(workout) {
  const { data, error } = await dbClient.from("tracker").insert([workout]);
  if (data) {
    return data;
  }
  if (error) {
    throw new ReadError("ReadDatabase", `${error.message}, ${error.details}`);
  }
  throw new Error();
}

async function getWorkoutsFromDb(uuid) {
  const { data, error } = await dbClient
    .from("tracer")
    .select("*")
    .eq("uuid", Number(uuid));
  if (data) {
    return data;
  }
  if (error) {
    throw new ReadError("ReadDatabase", `${error.message}, ${error.details}`);
  }
  throw new Error();
}

async function getFilteredWorkoutsFromDb(uuid, date) {
  const { data, error } = await dbClient
    .from("tracker")
    .select("*")
    .eq("uuid", uuid)
    .like("workout_date", `%${date}`);
  if (data) {
    return data;
  }
  if (error) {
    throw new ReadError("ReadDatabase", `${error.message}, ${error.details}`);
  }
  throw new Error();
}

async function createAccount(user) {
  const { data, error } = await dbClient
    .from("accounts")
    .insert([{ first_name: user.first_name, last_name: user.last_name }]);
  if (data) {
    return data;
  }
  if (error) {
    throw new ReadError("ReadDatabase", `${error.message}, ${error.details}`);
  }
  throw new Error();
}

async function getAccountFromDb(uuid) {
  const { data, error } = await dbClient
    .from("accounts")
    .select("*")
    .eq("uuid", uuid);
  if (data) {
    return data;
  }
  if (error) {
    throw new ReadError("ReadDatabase", `${error.message}, ${error.details}`);
  }
  throw new Error();
}

module.exports = {
  createAccount,
  createWorkout,
  getFilteredWorkoutsFromDb,
  getAccountFromDb,
  getWorkoutsFromDb,
};

// TODO create network error class
// const { data, error } = await supabase
//  .from('users')
//  .select()
//  .csv()
