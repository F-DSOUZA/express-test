const cors = require("cors");
const express = require("express");

const router = express.Router();
router.use(cors());
const {
  addWorkoutToDb,
  translateDbToCsv,
  filterWorkoutsByMonth,
  getAccountData,
} = require("./utils/handler");

const db = [];
const accounts = [
  { uuid: "1234", firstname: "Francesca", lastname: "D'Souza" },
  { uuid: "2345", firstname: "Rui", lastname: "Ramos" },
];

const buildSuccessResponse = (data) => ({ success: true, data });
const buildErrorResponse = (error) => ({
  success: false,
  error: error.message,
});

router.get("/", (req, res) => {
  try {
    if (req.headers.format === "csv") {
      res.setHeader("Content-Type", "text/csv");
      res.send(translateDbToCsv(db));
    }
    res.send(buildSuccessResponse(db));
  } catch (error) {
    res.status(500).send(buildErrorResponse(error));
  }
});

router.get("/account/:uuid", (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    res.send(buildSuccessResponse(getAccountData(accounts, req.params.uuid)));
  } catch (error) {
    res.status(500).send(buildErrorResponse(error));
  }
});

router.post("/", (req, res) => {
  try {
    addWorkoutToDb(db, req.body);
    res.setHeader("Content-Type", "application/json");
    res.send(db);
  } catch (error) {
    res.status(500).send(buildErrorResponse(error));
  }
});

router.get("/filter", (req, res) => {
  const { month, year } = req.query;
  try {
    const filteredWorkouts = filterWorkoutsByMonth(db, month, year);
    if (req.headers.format === "csv") {
      res.setHeader("Content-Type", "text/csv");
      res.send(translateDbToCsv(filteredWorkouts));
    }
    res.setHeader("Content-Type", "application/json");
    res.send(buildSuccessResponse(filteredWorkouts));
  } catch (error) {
    if (error.message === "No DB") {
      res.status(404).send(buildErrorResponse(error));
    } else {
      res.status(500).send(buildErrorResponse(error));
    }
  }
});

module.exports = router;
