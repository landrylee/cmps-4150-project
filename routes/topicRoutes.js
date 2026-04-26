const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topicController");

router.post("/createTopic", topicController.createTopic);
router.post("/subscribe", topicController.subscribe);
router.post("/unsubscribe", topicController.unsubscribe);
router.post("/postMessage", topicController.postMessage);
router.get("/dashboard", topicController.dashboard);
router.get("/stats", topicController.stats);
router.get("/topics", topicController.getTopics);
router.get("/notifications", topicController.getNotifications);

module.exports = router;