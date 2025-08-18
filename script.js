document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your Public Key
    // Get your key from https://dashboard.emailjs.com/admin/account
    emailjs.init('YOUR_PUBLIC_KEY');

    const orderForm = document.getElementById('ganji-order-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = orderForm.querySelector('.submit-button');

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the default form submission

        // --- 1. GET YOUR KEYS FROM EMAILJS.COM ---
        // Replace with your actual Service ID and Template ID
        const serviceID = 'YOUR_SERVICE_ID';
        const templateID = 'YOUR_TEMPLATE_ID';
        // ------------------------------------------

        // Update UI to show submission is in progress
        submitButton.disabled = true;
        submitButton.innerText = 'Submitting...';
        formStatus.innerText = 'Please wait while we confirm your order.';
        formStatus.style.color = '#333';

        // Use EmailJS to send the form data
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                // On Success
                formStatus.innerText = 'Thank You! Your order has been placed successfully.';
                formStatus.style.color = 'green';
                submitButton.innerText = 'Order Placed!';
                orderForm.reset(); // Clear the form fields
            })
            .catch((err) => {
                // On Failure
                formStatus.innerText = 'Oops! Something went wrong. Please try again.';
                formStatus.style.color = 'red';
                submitButton.disabled = false; // Re-enable button
                submitButton.innerText = 'Confirm My Order';
                console.error('EmailJS Error:', JSON.stringify(err));
            });
    });
});