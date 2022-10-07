const cors = require("cors");
const express = require("express");

const router = express.Router();
router.use(cors());
const { getAccount, addAccount } = require("./utils/handler");

const buildSuccessResponse = (data) => ({ success: true, data });
const buildErrorResponse = (error) => ({
  success: false,
  error: error.message,
});

router.post("/", async (req, res) => {
  try {
    const data = await addAccount(req.body);
    res.setHeader("Content-Type", "application/json");
    res.send(buildSuccessResponse(data));
  } catch (error) {
    res.status(500).send(buildErrorResponse(error));
  }
});

router.get("/", async (req, res) => {
  try {
    const { uuid } = req.query;
    res.setHeader("Content-Type", "application/json");
    const account = await getAccount(uuid);
    res.send(buildSuccessResponse(account));
  } catch (error) {
    res.status(500).send(buildErrorResponse(error));
  }
});

module.exports = router;

// TODO check when the errors are triggered. If handler function fails, what get returns to the user
