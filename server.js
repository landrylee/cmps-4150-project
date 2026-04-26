const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));

const userRoutes = 

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const session = require("express-session");

// Singleton DB connection
let db = null;
function connectDB() {
  if (!db) {
    db = mongoose.connect(process.env.MONGO_URI);
  }
  return db;
}

connectDB();

const userRoutes = require("./routes/userRoutes");
const topicRoutes = require("./routes/topicRoutes");

app.use("/", userRoutes);
app.use("/", topicRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});c