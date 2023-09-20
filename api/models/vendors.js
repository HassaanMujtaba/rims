const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const { Schema } = mongoose;

const vendor = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: ObjectId,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
});

const Vendor = mongoose.model("Vendor", vendor);
module.exports = { Vendor };
