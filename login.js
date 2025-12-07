// ============================
// LOGIN FORM HANDLER
// ============================

const loginForm = document.getElementById("login-form");
const messageEl = document.getElementById("message");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      showMessage("Please enter email and password.");
      return;
    }

    // signup.js এ যেটা সেভ করেছি সেটাই পড়ছি
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      showMessage("No account found. Please sign up first.");
      return;
    }

    if (savedUser.email === email && savedUser.password === password) {
      // সফল login
      localStorage.setItem("loggedIn", "true");

      showMessage("Login successful! Redirecting...", false, "lightgreen");

      setTimeout(() => {
        window.location.href = "index.html"; // home page
      }, 1000);
    } else {
      showMessage("Invalid email or password. Please try again.");
    }
  });
}

function showMessage(text, clear = false, color = "rgb(248,113,113)") {
  if (!messageEl) return;
  if (clear) {
    messageEl.textContent = "";
  } else {
    messageEl.style.color = color; // default: red-ish
    messageEl.textContent = text;
  }
}

// ============================
// SOCIAL BUTTONS (Mock)
// ============================

const googleBtn = document.getElementById("google-signup");
const facebookBtn = document.getElementById("facebook-signup");

if (googleBtn) {
  googleBtn.addEventListener("click", function () {
    showMessage("Google login is not connected yet (demo).");
  });
}

if (facebookBtn) {
  facebookBtn.addEventListener("click", function () {
    showMessage("Facebook login is not connected yet (demo).");
  });
}
