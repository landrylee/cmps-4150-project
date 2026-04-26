const User = require("../models/User");
const Topic = require("../models/Topic");

exports.createTopic = async (req, res) => {
  try {
    const { name, username } = req.body;

    let topic = await Topic.findOne({ name: name.trim() });

    if (!topic) {
      topic = new Topic({ name: name.trim() });
      await topic.save();
    }

    const user = await User.findOne({ username });

    if (!user) return res.send("User not found");

    if (!user.subscriptions.some(id => id.equals(topic._id))) {
      user.subscriptions.push(topic._id);
    }

    if (!topic.subscribers.some(id => id.equals(user._id))) {
      topic.subscribers.push(user._id);
    }

    await user.save();
    await topic.save();

    res.send("Topic created/subscribed");
  } catch {
    res.send("Error creating topic");
  }
};

exports.subscribe = async (req, res) => {
  const { username, topicName } = req.body;

  const user = await User.findOne({ username });
  const topic = await Topic.findOne({ name: topicName });

  if (!user || !topic) return res.send("Not found");

  if (!user.subscriptions.some(id => id.equals(topic._id))) {
    user.subscriptions.push(topic._id);
  }

  if (!topic.subscribers.some(id => id.equals(user._id))) {
    topic.subscribers.push(user._id);
  }

  await user.save();
  await topic.save();

  res.send("Subscribed");
};

exports.unsubscribe = async (req, res) => {
  const { username, topicName } = req.body;

  const user = await User.findOne({ username });
  const topic = await Topic.findOne({ name: topicName });

  if (!user || !topic) {
    return res.send("User or topic not found");
  }

  user.subscriptions = user.subscriptions.filter(
    id => !id.equals(topic._id)
  );

  topic.subscribers = topic.subscribers.filter(
    id => !id.equals(user._id)
  );

  await user.save();
  await topic.save();

  res.send("Unsubscribed successfully");
};

exports.postMessage = async (req, res) => {
  const { username, topicName, content } = req.body;

  const user = await User.findOne({ username });
  const topic = await Topic.findOne({ name: topicName });

  const isSubscribed = topic.subscribers.some(
    id => id.toString() === user._id.toString()
  );

  if (!isSubscribed) return res.send("Not subscribed");

  topic.messages.push({ content });

  await topic.save();

  res.send("Message posted");
};

exports.dashboard = async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).populate("subscriptions");

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

exports.stats = async (req, res) => {
  const topics = await Topic.find();

  res.json(
    topics.map(t => ({
      topicName: t.name,
      accessCount: t.accessCount
    }))
  );
};