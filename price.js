document.addEventListener("DOMContentLoaded", () => {
  const paymentForm = document.getElementById("payment-form");
  const messageDiv = document.getElementById("message");

  //  Payment History save 
  function savePaymentHistory(data) {
    const existing = JSON.parse(localStorage.getItem("paymentHistory") || "[]");
    existing.push(data);
    localStorage.setItem("paymentHistory", JSON.stringify(existing));
  }

  //  Form Submit 
  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault(); // default submit off

    messageDiv.textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const membershipSelect = document.getElementById("membership");
    const membership = membershipSelect.value;

    const selectedOption =
      membershipSelect.options[membershipSelect.selectedIndex];
    const amount = selectedOption.dataset.amount; // data-amount theke taka

    const cardNumber = document.getElementById("card-number").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    // Basic validation
    if (
      !validateCardNumber(cardNumber) ||
      !validateExpiry(expiry) ||
      !validateCVV(cvv)
    ) {
      messageDiv.textContent = "Please enter valid payment details.";
      messageDiv.style.color = "red";
      return;
    }

    // Processing message
    messageDiv.textContent = "Processing payment...";
    messageDiv.style.color = "skyblue";

    setTimeout(() => {
      // ✅ Payment successful
      messageDiv.textContent = `Payment successful! Thank you, ${name}, for purchasing the ${membership}.`;
      messageDiv.style.color = "lightgreen";

      // ✅ History data prepare
      const paymentData = {
        name,
        email,
        membership,
        amount: amount + " BDT",
        date: new Date().toLocaleString(),
      };

      // ✅ LocalStorage এ save
      savePaymentHistory(paymentData);

      paymentForm.reset();

      // সামান্য delay দিয়ে transaction page এ পাঠাই
      setTimeout(() => {
        window.location.href = "transactions.html"; 
      }, 1500);
    }, 2000); // payment process simulate
  });

  // Validate card number (basic 16-digit)
  function validateCardNumber(cardNumber) {
    const cardNumberPattern = /^[0-9]{16}$/;
    return cardNumberPattern.test(cardNumber);
  }

  // Validate expiry date MM/YY
  function validateExpiry(expiry) {
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return expiryPattern.test(expiry);
  }

  // Validate CVV (3-digit)
  function validateCVV(cvv) {
    const cvvPattern = /^[0-9]{3}$/;
    return cvvPattern.test(cvv);
  }
});
