const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: { type: String, required: true },
  highScore: { type: Number, required: true },
  tutorialComplete: false
},
{
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
