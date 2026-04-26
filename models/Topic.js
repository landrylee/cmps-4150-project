const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  messages: [
    {
      username: String,
      content: String,
      date: { type: Date, default: Date.now }
    }
  ],
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  accessCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Topic", TopicSchema);