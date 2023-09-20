const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const { Schema } = mongoose;

const user = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', user);
module.exports = { User };
