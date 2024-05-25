const mongoose = require("mongoose");

const transactionShema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
});
