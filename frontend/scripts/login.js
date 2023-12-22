function togglePassword() {
    const passwordInput = document.getElementById('password');
    const passwordToggleBtn = document.getElementById('passwordToggleBtn');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordToggleBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        passwordToggleBtn.textContent = 'Show';
    }
}

function validateForm() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    const isPasswordValid = passwordInput.value.length >= 8;

    loginButton.disabled = !(isEmailValid && isPasswordValid);
}