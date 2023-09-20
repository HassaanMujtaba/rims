const { Client } = require("../models");
const { setResponse } = require("../utils");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const query = await Client.find({});
    if (query) {
      return setResponse(res, "success", query, 200);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const query = await Client.findOne({ _id: req.params.id });
    if (query) {
      return setResponse(res, "success", query, 200);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

module.exports = { clients: router };
