document.addEventListener("DOMContentLoaded", function () {
  // --- FANCYBOX INITIALIZATION ---
  Fancybox.bind("[data-fancybox='ganji-gallery']", {});

  const orderForm = document.getElementById("ganji-order-form");
  if (orderForm) {
    emailjs.init("JCZXhEqS-zF9AS0F7"); // Replace with your EmailJS Public Key

    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formStatus = document.getElementById("form-status");
      const submitButton = this.querySelector(".submit-button");

      submitButton.disabled = true;
      submitButton.innerText = "Submitting...";
      formStatus.innerText = "Please wait, sending order details...";
      formStatus.style.color = "#333";

      // Send email to admin
      emailjs
        .sendForm("service_fapr489", "template_e8xsjpa", orderForm)
        .then(() => {
          formStatus.innerText =
            "✅ Thank you! Your order has been placed. Admin has been notified.";
          formStatus.style.color = "green";
          submitButton.innerText = "Order Placed!";
          orderForm.reset();

          // Reset form + status after 4 seconds
          setTimeout(() => {
            formStatus.innerText = "";
            submitButton.disabled = false;
            submitButton.innerText = "Confirm My Order";
          }, 4000);
        })
        .catch((err) => {
          console.error("EmailJS Error:", err);
          formStatus.innerText =
            "❌ Something went wrong while sending email. Please try again.";
          formStatus.style.color = "red";
          submitButton.disabled = false;
          submitButton.innerText = "Confirm My Order";

          // Clear error message after 4 seconds
          setTimeout(() => {
            formStatus.innerText = "";
          }, 4000);
        });
    });
  }
});
