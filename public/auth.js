async function login() {
    const res = await fetch("/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        username: loginUser.value,
        password: loginPass.value
      })
    });
  
    const text = await res.text();
  
    if (text === "ok") {
      window.location = "/dashboard.html";
    }
  }
  
  async function register() {
    const res = await fetch("/register", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        username: regUser.value,
        password: regPass.value
      })
    });
  
    window.location = "/dashboard.html";
  }