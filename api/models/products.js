const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const { Schema } = mongoose;

const product = new Schema({
  title: {
    type: String,
    required: true,
  },
  vendor: {
    type: ObjectId,
    required: true,
  },
  actual_price: {
    type: String,
    required: true,
  },
  selling_price: {
    type: String,
    required: true,
  },
  display_picture: {
    type: ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const Product = mongoose.model("Product", product);
module.exports = { Product };
