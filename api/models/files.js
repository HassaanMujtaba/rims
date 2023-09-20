const mongoose = require("mongoose");
const { Schema } = mongoose;

const file = new Schema({
  file_code: {
    type: Buffer,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
});

const File = mongoose.model("File", file);
module.exports = { File };
