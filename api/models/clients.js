const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const { Schema } = mongoose;

const client = new Schema({
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
});

const Client = mongoose.model("Client", client);
module.exports = { Client };
