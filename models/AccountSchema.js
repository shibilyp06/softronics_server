const mongoose = require("mongoose");

const accountShema = mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  ifsc: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  block: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const AccountModel = mongoose.model("accountdetails", accountShema);
module.exports = AccountModel;
