
function getData() {
    fetch('http://localhost:3001/')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}


async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        email: email,
        password: password
    };
    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.text();
            console.log(result); // Display the result in the console
            window.location.href = 'loggedUserPage.html';
        } else {
            console.error('Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}

async function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const data = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    };
    try {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.text();
            console.log(result); // Display the result in the console
            window.location.href = 'homePage.html';
        } else {
            console.error('Register failed');
        }
    } catch (error) {
        console.error('Error during register:', error);
    }
}

async function deleteUser(id) {

    const data = {
        id: id
    };

    try {
        const response = await fetch('http://localhost:3001/delete-account', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }); 
        if (response.ok) {
            window.location.href = 'homePage.html';
        } else {
            console.error('Delete failed');
        }
    }
    catch (error) {
        console.error('Error during delete:', error);
    }
}

async function updateUser(id) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const data = {
        id: id,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    };
    try {
        const response = await fetch('http://localhost:3001/update-user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }); 
        if (response.ok) {
            window.location.href = 'loggedUserPage.html';
        } else {
            console.error('Update failed');
        }
    }
    catch (error) {
        console.error('Error during update:', error);
    }
}