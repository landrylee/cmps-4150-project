const API = "";

function show(data) {
  document.getElementById("output").innerText =
    JSON.stringify(data, null, 2);
}

async function register() {
  const res = await fetch(API + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: regUser.value,
      password: regPass.value
    })
  });
  show(await res.json());
}

async function login() {
  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: loginUser.value,
      password: loginPass.value
    })
  });
  show(await res.json());
}

async function createTopic() {
  const res = await fetch("/createTopic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: topicName.value
    })
  });
  show(await res.json());
}

async function subscribe() {
  const res = await fetch("/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: subUser.value,
      topicName: subTopic.value
    })
  });
  show(await res.json());
}

async function unsubscribe() {
  const res = await fetch("/unsubscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: subUser.value,
      topicName: subTopic.value
    })
  });
  show(await res.json());
}

async function postMessage() {
  const res = await fetch("/postMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: msgUser.value,
      topicName: msgTopic.value,
      content: msgContent.value
    })
  });
  show(await res.json());
}

async function getDashboard() {
  const username = dashUser.value;
  const res = await fetch("/dashboard/" + username);
  show(await res.json());
}

async function getStats() {
  const res = await fetch("/stats");
  show(await res.json());
}