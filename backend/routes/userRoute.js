const querystring = require('querystring');

exports.userLogin = (req, res, next) => {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
  
      req.on('end', () => {
        const postData = querystring.parse(body);
        const email = postData.email;
        const password = postData.password;
  
        // Check if the user exists and the password is correct
        if (users[email] && users[email].password === password) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Login successful');
        } else {
          res.writeHead(401, { 'Content-Type': 'text/plain' });
          res.end('Invalid username or password');
        }
      });
    } else {
      // Handle invalid HTTP method
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
    }
};

exports.userRegister = (req, res, next) => {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
  
      req.on('end', () => {
        const postData = querystring.parse(body);
        const username = postData.username;
        const password = postData.password;
        const email = postData.email;
        const firstName = postData.firstName;
        const lastName = postData.lastName;
  
        // Check if the user already exists
        if (users[username]) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Username already exists');
        } else {
          // Create the user
          users[username] = { password, email, firstName, lastName };
  
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Registration successful');
        }
      });
    } else {
      // Handle invalid HTTP method
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
    }
};

exports.userForgotPassword = (req, res, next) => {
  // TODO: Implement this function
};