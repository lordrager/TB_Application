function togglePassword(inputId, buttonId) {
    const passwordInput = document.getElementById(inputId);
    const passwordToggleBtn = document.getElementById(buttonId);

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
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const passwordInput = document.getElementById('password');
    const repeatPasswordInput = document.getElementById('repeatPassword');
    const registerButton = document.getElementById('registerButton');

    const areFieldsEmpty = (
        emailInput.value.trim() === '' ||
        firstNameInput.value.trim() === '' ||
        lastNameInput.value.trim() === '' ||
        passwordInput.value === '' ||
        repeatPasswordInput.value === ''
    );

    const passwordEqual = ( passwordInput === repeatPasswordInput);

    registerButton.disabled = areFieldsEmpty && passwordEqual;
}

function goToLoginPage() {
    window.location.href = 'loginPage.html';
}