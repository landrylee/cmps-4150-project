const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = new User({ username, password });
    await user.save();

    res.send("User registered!");
  } catch {
    res.send("Error registering user");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (user) {
    res.send("Login successful");
  } else {
    res.send("Invalid credentials");
  }
};