const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//categories
const categories_model = new Schema({
  type: { type: String, default: "Investment" },
  color: { type: String, default: "#FCBE44" },
});

//transaction model
const transaction_model = new Schema({
  name: { type: String, default: "Anonymous" },
  type: { type: String, default: "Investment" },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
});

//user_model
const user_model = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, unique: true, minlength: 3 },
});

const Categories = mongoose.model("Categories", categories_model);
const Transaction = mongoose.model("Transaction", transaction_model);
const User = mongoose.model("User", user_model);

exports.default = Transaction;
module.exports = {
  Categories,
  Transaction,
  User,
};
