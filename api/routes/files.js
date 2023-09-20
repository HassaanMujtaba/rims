const { File } = require("../models");
const { setResponse } = require("../utils");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
  try {
    const response = await File.findOne({ _id: req.params.id });
    if (!response) return setResponse(res, "File not found", null, 404);
    res.contentType(response.extension);
    res.status(200).send(response.file_code);
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.files) {
      return setResponse(res, "no file provided", null, 500);
    }
    const { file } = req.files;
    const allowedExtension = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedExtension.includes(req.files.file.mimetype))
      return setResponse(res, "extension not allowed", null, 500);
    const newData = new File({
      file_code: file.data,
      extension: file.mimetype,
    });
    const query = await newData.save();
    if (query) {
      return setResponse(res, "success", query, 200);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = await File.deleteOne({ _id: req.params.id });
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

module.exports = { files: router };
