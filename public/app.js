async function loadAll() {
    const dash = await fetch("/dashboard");
    document.getElementById("dashboard").innerText =
      JSON.stringify(await dash.json(), null, 2);
  
    const topics = await fetch("/topics");
    const list = await topics.json();
  
    const container = document.getElementById("topics");
    container.innerHTML = "";
  
    list.forEach(t => {
      container.innerHTML += `
        <div>
          ${t.name}
          <button onclick="subscribe('${t.name}')">Sub</button>
          <button onclick="unsubscribe('${t.name}')">Unsub</button>
        </div>
      `;
    });
  
    const notif = await fetch("/notifications");
    document.getElementById("notifications").innerText =
      JSON.stringify(await notif.json(), null, 2);
  }
  
  async function createTopic() {
    await fetch("/createTopic", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ name: topicName.value })
    });
    loadAll();
  }
  
  async function subscribe(name) {
    await fetch("/subscribe", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ topicName: name })
    });
    loadAll();
  }
  
  async function unsubscribe(name) {
    await fetch("/unsubscribe", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ topicName: name })
    });
    loadAll();
  }
  
  async function postMessage() {
    await fetch("/postMessage", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        topicName: msgTopic.value,
        content: msgContent.value
      })
    });
    loadAll();
  }
  
  async function logout() {
    await fetch("/logout", { method: "POST" });
    window.location = "/";
  }
  
  loadAll();