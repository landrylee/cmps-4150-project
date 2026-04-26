const User = require("../models/User");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });
  await user.save();

  req.session.user = username;

  res.send("registered");
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) return res.send("invalid");

  req.session.user = username;

  res.send("ok");
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.send("logged out");
};