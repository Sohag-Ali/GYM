document.addEventListener("DOMContentLoaded", () => {
    const paymentForm = document.getElementById("payment-form");
    const messageDiv = document.getElementById("message");

    // Add event listener for form submission
    paymentForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Clear any previous message
        messageDiv.textContent = "";

        // Get input values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const membership = document.getElementById("membership").value;
        const cardNumber = document.getElementById("card-number").value.trim();
        const expiry = document.getElementById("expiry").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        // Basic validation
        if (!validateCardNumber(cardNumber) || !validateExpiry(expiry) || !validateCVV(cvv)) {
            messageDiv.textContent = "Please enter valid payment details.";
            messageDiv.style.color = "red";
            return;
        }

        // Simulate payment processing
        messageDiv.textContent = "Processing payment...";
        messageDiv.style.color = "blue";

        // Simulate a delay (e.g., waiting for payment gateway response)
        setTimeout(() => {
            // Display success message
            messageDiv.textContent = `Payment successful! Thank you, ${name}, for purchasing the ${membership}.`;
            messageDiv.style.color = "green";
            paymentForm.reset(); // Clear the form fields
        }, 2000); // 2-second delay to simulate payment processing
    });

    // Validate card number (basic validation for 16-digit numbers)
    function validateCardNumber(cardNumber) {
        const cardNumberPattern = /^[0-9]{16}$/;
        return cardNumberPattern.test(cardNumber);
    }

    // Validate expiry date in MM/YY format
    function validateExpiry(expiry) {
        const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return expiryPattern.test(expiry);
    }

    // Validate CVV (3-digit number)
    function validateCVV(cvv) {
        const cvvPattern = /^[0-9]{3}$/;
        return cvvPattern.test(cvv);
    }
});
