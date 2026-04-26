const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

const userRoutes = require("./routes/userRoutes");
const topicRoutes = require("./routes/topicRoutes");

app.use("/", userRoutes);
app.use("/", topicRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});