function validateForm() {
    const emailInput = document.getElementById('email');
    const submitButton = document.getElementById('submitButton');

    submitButton.disabled = emailInput.value.trim() === '';
}