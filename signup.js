document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Simple validation
    if (fullname && email && password && confirmPassword) {
        if (password === confirmPassword) {
            // Simulating sign-up success
            document.getElementById('message').innerText = 'Sign up successful! Welcome, ' + fullname + '!';
        } else {
            document.getElementById('message').innerText = 'Passwords do not match. Please try again.';
        }
    } else {
        document.getElementById('message').innerText = 'Please fill in all fields.';
    }
});

// Mock functions for social login
document.getElementById('google-signup').addEventListener('click', function() {
    // Simulating Google sign up
    document.getElementById('message').innerText = 'Google sign up successful!';
});

document.getElementById('facebook-signup').addEventListener('click', function() {
    // Simulating Facebook sign up
    document.getElementById('message').innerText = 'Facebook sign up successful!';
});
document.getElementById('Log-in').addEventListener('click', function() {
    // Simulating Google sign up
    document.getElementById('message').innerText = 'Log in successful!';
});