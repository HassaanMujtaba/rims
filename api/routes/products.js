const { Product } = require("../models");
const { setResponse } = require("../utils");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const query = await Product.find({});
    if (query) {
      return setResponse(res, "success", query, 200);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const query = await Product.findOne({ _id: req.params.id });
    if (query) {
      return setResponse(res, "success", query, 200);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      vendor,
      actual_price,
      selling_price,
      display_picture,
      quantity,
    } = req.body;

    const newData = new Product({
      title,
      vendor,
      actual_price,
      selling_price,
      display_picture,
      quantity: parseInt(quantity),
      status: true,
    });
    const query = await newData.save();
    if (query) {
      return setResponse(res, "success", query, 200);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = req.body;
    const query = await Product.updateOne(
      { _id: req.params.id },
      { $set: data }
    );
    if (query.matchedCount > 0) {
      return setResponse(res, "success", null, 200);
    } else if (query.matchedCount < 1) {
      return setResponse(res, "resource not found", null, 404);
    } else {
      return setResponse(res, "unable to update", null, 500);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const data = req.body;
    const query = await Product.updateOne(
      { _id: req.params.id },
      { $set: data }
    );
    if (query.matchedCount > 0) {
      return setResponse(res, data.status ? "Enabled" : "Disabled", null, 200);
    } else if (query.matchedCount < 1) {
      return setResponse(res, "resource not found", null, 404);
    } else {
      return setResponse(res, "unable to update", null, 500);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = await Product.deleteOne({ _id: req.params.id });
    if (query.deletedCount > 0) {
      return setResponse(res, "success", query, 200);
    } else if (query.matchedCount < 1) {
      return setResponse(res, "resource not found", null, 404);
    } else {
      return setResponse(res, "unable to delete", null, 500);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

module.exports = { products: router };
