const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
  name: { type: String, required: true },
  ingredients: { type: Array, required: true }
},
{
  timestamps: true
});

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = Drink;
