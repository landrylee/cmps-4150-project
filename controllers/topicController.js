const User = require("../models/User");
const Topic = require("../models/Topic");
const Notification = require("../models/Notification");

// CREATE TOPIC (T3)
exports.createTopic = async (req, res) => {
  const { name, username } = req.body;

  let topic = await Topic.findOne({ name });

  if (!topic) {
    topic = new Topic({ name });
    await topic.save();
  }

  const user = await User.findOne({ username });

  if (!user) return res.send("User not found");

  if (!user.subscriptions.includes(topic._id)) {
    user.subscriptions.push(topic._id);
  }

  if (!topic.subscribers.includes(user._id)) {
    topic.subscribers.push(user._id);
  }

  await user.save();
  await topic.save();

  res.send("Topic created and subscribed");
};

// SUBSCRIBE
exports.subscribe = async (req, res) => {
  const { username, topicName } = req.session.user;

  const user = await User.findOne({ username });
  const topic = await Topic.findOne({ name: topicName });

  if (!user || !topic) return res.send("Not found");

  if (!user.subscriptions.includes(topic._id)) {
    user.subscriptions.push(topic._id);
  }

  if (!topic.subscribers.includes(user._id)) {
    topic.subscribers.push(user._id);
  }

  await user.save();
  await topic.save();

  res.send("Subscribed");
};

// UNSUBSCRIBE
exports.unsubscribe = async (req, res) => {
  const { username, topicName } = req.session.user;

  const user = await User.findOne({ username });
  const topic = await Topic.findOne({ name: topicName });

  user.subscriptions = user.subscriptions.filter(id => !id.equals(topic._id));
  topic.subscribers = topic.subscribers.filter(id => !id.equals(user._id));

  await user.save();
  await topic.save();

  res.send("Unsubscribed");
};

// POST MESSAGE (T4 + OBSERVER)
exports.postMessage = async (req, res) => {
  const { username, topicName, content } = req.session.user;

  const user = await User.findOne({ username });
  const topic = await Topic.findOne({ name: topicName }).populate("subscribers");

  const isSubscribed = topic.subscribers.some(id => id._id.equals(user._id));
  if (!isSubscribed) return res.send("Not subscribed");

  topic.messages.push({ content });
  await topic.save();

  // OBSERVER PATTERN (REAL)
  for (let sub of topic.subscribers) {
    if (!sub._id.equals(user._id)) {
      await Notification.create({
        user: sub._id,
        message: `New message in ${topic.name}: ${content}`
      });
    }
  }

  res.send("Message posted");
};

// DASHBOARD (T2.1)
exports.dashboard = async (req, res) => {
  const user = await User.findOne({ username: req.session.user })
    .populate("subscriptions");

  const result = [];

  for (let topic of user.subscriptions) {
    topic.accessCount++;
    await topic.save();

    result.push({
      topicName: topic.name,
      messages: topic.messages.slice(-2)
    });
  }

  res.json(result);
};

// ALL TOPICS (T2.2)
exports.getTopics = async (req, res) => {
  const topics = await Topic.find();
  res.json(topics);
};

// NOTIFICATIONS
exports.getNotifications = async (req, res) => {
  const user = await User.findOne({ username: req.session.user });

  const notifications = await Notification.find({ user: user._id });

  res.json(notifications);
};

// STATS (T8)
exports.stats = async (req, res) => {
  const topics = await Topic.find();

  res.json(
    topics.map(t => ({
      topicName: t.name,
      accessCount: t.accessCount
    }))
  );
};