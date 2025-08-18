document.addEventListener('DOMContentLoaded', function() {
    
    // --- FANCYBOX INITIALIZATION ---
    Fancybox.bind("[data-fancybox='ganji-gallery']", {});

    // --- GOOGLE SHEETS FORM SUBMISSION LOGIC ---
    const orderForm = document.getElementById('ganji-order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formStatus = document.getElementById('form-status');
            const submitButton = this.querySelector('.submit-button');
            const scriptURL = 'https://script.google.com/macros/s/AKfycbzD5soOnP5f_RloH0MKmbSPs3QBI3mF1sR7n5H1_EAs-Y6y7RVAdpOnNZgaKRXHlKJ2/exec';

            submitButton.disabled = true;
            submitButton.innerText = 'Submitting...';
            formStatus.innerText = 'Please wait, your order is being placed...';
            formStatus.style.color = '#333';

            fetch(scriptURL, { method: 'POST', body: new FormData(orderForm) })
            .then(response => {
                if (response.ok) {
                    formStatus.innerText = 'Thank You! Your order has been placed successfully.';
                    formStatus.style.color = 'green';
                    submitButton.innerText = 'Order Placed!';
                    orderForm.reset(); // Form ko clear kar dein
                } else {
                    // Agar server se koi error aaye to
                    throw new Error('Something went wrong on the server.');
                }
            })
            .catch(error => {
                formStatus.innerText = 'Oops! Something went wrong. Please try again.';
                formStatus.style.color = 'red';
                submitButton.disabled = false;
                submitButton.innerText = 'Confirm My Order';
                console.error('Error!', error.message);
            });
        });
    }
});