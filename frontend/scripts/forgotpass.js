function validateForm() {
    const emailInput = document.getElementById('email');
    const submitButton = document.getElementById('submitButton');
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);

    submitButton.disabled = !isEmailValid;
}