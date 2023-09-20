const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const { Schema } = mongoose;

const order = new Schema({
  client_name: {
    type: String,
    required: true,
  },
  client_phone: {
    type: String,
    required: true,
  },
  client_address: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date()
  }
});

const Order = mongoose.model("Order", order);
module.exports = { Order };
