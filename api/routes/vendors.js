const { Vendor } = require("../models");
const { setResponse } = require("../utils");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const query = await Vendor.find({});
    if (query) {
      return setResponse(res, "success", query, 200);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const query = await Vendor.findOne({ _id: req.params.id });
    if (query) {
      return setResponse(res, "success", query, 200);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, address, profile_picture, cnic, email, phone_number } =
      req.body;

    const phone_numberExist = await Vendor.findOne({ phone_number });
    if (phone_numberExist) {
      return setResponse(res, "phone number already exist", null, 200);
    }
    const emailExist = await Vendor.findOne({ email });
    if (emailExist) {
      return setResponse(res, "email already exist", null, 200);
    }
    const cnicExist = await Vendor.findOne({ cnic });
    if (cnicExist) {
      return setResponse(res, "cnic already exist", null, 200);
    }

    const newData = new Vendor({
      name,
      address,
      profile_picture,
      cnic,
      email,
      phone_number,
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
    const query = await Vendor.updateOne(
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

router.delete("/:id", async (req, res) => {
  try {
    const query = await Vendor.deleteOne({ _id: req.params.id });
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

module.exports = { vendors: router };
