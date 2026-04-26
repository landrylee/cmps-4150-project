function show(data) {
    document.getElementById("output").innerText = data;
  }
  
  async function register() {
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: document.getElementById("regUser").value,
        password: document.getElementById("regPass").value
      })
    });
    show(await res.text());
  }
  
  async function login() {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: document.getElementById("loginUser").value,
        password: document.getElementById("loginPass").value
      })
    });
    show(await res.text());
  }
  
  async function createTopic() {
    const res = await fetch("/createTopic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("topicName").value,
        username: document.getElementById("subUser").value
      })
    });
    show(await res.text());
  }
  
  async function subscribe() {
    const res = await fetch("/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: document.getElementById("subUser").value,
        topicName: document.getElementById("subTopic").value
      })
    });
    show(await res.text());
  }
  
  async function unsubscribe() {
    const res = await fetch("/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: document.getElementById("subUser").value,
        topicName: document.getElementById("subTopic").value
      })
    });
    show(await res.text());
  }
  
  async function postMessage() {
    const res = await fetch("/postMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: document.getElementById("msgUser").value,
        topicName: document.getElementById("msgTopic").value,
        content: document.getElementById("msgContent").value
      })
    });
    show(await res.text());
  }
  
  async function getDashboard() {
    const username = document.getElementById("dashUser").value;
    const res = await fetch("/dashboard/" + encodeURIComponent(username));
    show(JSON.stringify(await res.json(), null, 2));
  }
  
  async function getStats() {
    const res = await fetch("/stats");
    show(JSON.stringify(await res.json(), null, 2));
  }