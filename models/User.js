const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }]
});

module.exports = mongoose.model("User", UserSchema);