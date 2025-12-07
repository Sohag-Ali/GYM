// ============================
// SIGNUP FORM HANDLER
// ============================

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop form from refreshing page

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const messageBox = document.getElementById('message');

    // Validation
    if (!fullname || !email || !password || !confirmPassword) {
        messageBox.innerText = "Please fill in all fields.";
        return;
    }

    if (password.length < 6) {
        messageBox.innerText = "Password must be at least 6 characters.";
        return;
    }

    if (password !== confirmPassword) {
        messageBox.innerText = "Passwords do not match.";
        return;
    }

    // Create user object for localStorage
    const userData = {
        fullname: fullname,
        email: email,
        password: password
    };

    // Save user into localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    // Reset loggedIn status (signup user not logged yet)
    localStorage.setItem("loggedIn", "false");

    // Success Message
    messageBox.style.color = "lightgreen";
    messageBox.innerText = "Signup successful! Redirecting to Login...";

    // Redirect to login page
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1200);
});


// ============================
// SOCIAL BUTTONS (Mock)
// ============================

document.getElementById('google-signup').addEventListener('click', function() {
    document.getElementById('message').innerText = "Google signup successful!";
});

document.getElementById('facebook-signup').addEventListener('click', function() {
    document.getElementById('message').innerText = "Facebook signup successful!";
});
