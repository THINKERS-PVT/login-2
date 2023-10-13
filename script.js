// script.js  
const loginForm = document.querySelector("#login-form");  
  
loginForm.addEventListener("submit", async (event) => {  
  event.preventDefault();  
  
  const formData = new FormData(loginForm);  
  const username = atob(formData.get("username"));  
  const password = formData.get("password");  
  
  const passwordHash = await sha256(password);  
  
  try {  
    const response = await fetch("https://api.thinkerrs.com/login/test", {  
      method: "POST",  
      headers: {  
        "Content-Type": "application/json",  
      },  
      body: JSON.stringify({ username, password: passwordHash }),  
    });  
  
    if (response.ok) {  
      const data = await response.json();  
      console.log(data);  
      // Do something with the response data  
    } else {  
      console.error("Error:", response.statusText);  
    }  
  } catch (error) {  
    console.error("Error:", error);  
  }  
});  
  
async function sha256(message) {  
  // encode as UTF-8  
  const msgBuffer = new TextEncoder().encode(message);  
  
  // hash the message  
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);  
  
  // convert ArrayBuffer to Array  
  const hashArray = Array.from(new Uint8Array(hashBuffer));  
  
  // convert bytes to hex string  
  const hashHex = hashArray.map((b) => ("00" + b.toString(16)).slice(-2)).join("");  
  return hashHex;  
}  
