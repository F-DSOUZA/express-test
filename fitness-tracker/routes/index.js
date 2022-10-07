const cors = require("cors");
const express = require("express");

const router = express.Router();
router.use(cors());
const {
  getWorkouts,
  addWorkout,
  translateDbToCsv,
  filterWorkoutsByMonth,
} = require("./utils/handler");

const buildSuccessResponse = (data) => ({ success: true, data });
const buildErrorResponse = (error) => ({
  success: false,
  error: error.message,
});

router.post("/", async (req, res) => {
  try {
    const { uuid } = req.query;
    const data = await addWorkout(uuid, req.body);
    res.setHeader("Content-Type", "application/json");
    res.send(buildSuccessResponse(data));
  } catch (error) {
    res.status(500).send(buildErrorResponse(error));
  }
});

router.get("/", async (req, res) => {
  try {
    const { uuid } = req.query;
    if (req.headers.format === "csv") {
      res.setHeader("Content-Type", "text/csv");
      const csvData = await translateDbToCsv(uuid);
      res.send(buildSuccessResponse(csvData));
    }
    const data = await getWorkouts(uuid);
    res.send(buildSuccessResponse(data));
  } catch (error) {
    res.status(500).send(buildErrorResponse(error));
  }
});

router.get("/filter", async (req, res) => {
  const { month, year, uuid } = req.query;
  try {
    const data = await filterWorkoutsByMonth(uuid, month, year);
    if (req.headers.format === "csv") {
      res.setHeader("Content-Type", "text/csv");
      res.send(buildSuccessResponse(translateDbToCsv(data)));
    }
    res.setHeader("Content-Type", "application/json");
    res.send(buildSuccessResponse(data));
  } catch (error) {
    if (error.message === "No DB") {
      res.status(404).send(buildErrorResponse(error));
    } else {
      res.status(500).send(buildErrorResponse(error));
    }
  }
});

module.exports = router;
