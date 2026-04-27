async function loadAll() {
    // DASHBOARD (Your Topics)
    const dash = await fetch("/dashboard");
    const dashData = await dash.json();
  
    let dashboardHTML = "";
  
    if (dashData.length === 0) {
      dashboardHTML = "<p>No subscribed topics yet</p>";
    } else {
      dashData.forEach(topic => {
        dashboardHTML += `
          <h3>${topic.topicName}</h3>
          <p><strong>Access Count:</strong> ${topic.accessCount}</p>
`        ;
  
        if (topic.messages.length === 0) {
          dashboardHTML += "<p>No messages yet</p>";
        } else {
          topic.messages.forEach(msg => {
            dashboardHTML += `
              <p>
                <strong>${msg.username || "User"}:</strong>
                ${msg.content}
              </p>
            `;
          });
        }
  
        dashboardHTML += "<hr>";
      });
    }
  
    document.getElementById("dashboard").innerHTML = dashboardHTML;
  
  
    // ALL TOPICS
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
  
  
    // NOTIFICATIONS
    const notif = await fetch("/notifications");
    const notifData = await notif.json();
  
    let notifHTML = "";
  
    if (notifData.length === 0) {
      notifHTML = "<p>No new notifications</p>";
    } else {
      notifData.forEach(n => {
        notifHTML += `<p>• ${n.message}</p>`;
      });
    }
  
    document.getElementById("notifications").innerHTML = notifHTML;
  }
  
  
  async function createTopic() {
    await fetch("/createTopic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("topicName").value
      })
    });
  
    loadAll();
  }
  
  
  async function subscribe(name) {
    await fetch("/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicName: name
      })
    });
  
    loadAll();
  }
  
  
  async function unsubscribe(name) {
    await fetch("/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicName: name
      })
    });
  
    loadAll();
  }
  
  
  async function postMessage() {
    await fetch("/postMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicName: document.getElementById("msgTopic").value,
        content: document.getElementById("msgContent").value
      })
    });
  
    loadAll();
  }
  
  
  async function logout() {
    await fetch("/logout", {
      method: "POST"
    });
  
    window.location = "/";
  }
  
  
  loadAll();