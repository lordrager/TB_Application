const http = require('http');
const url = require('url');
const { userLogin, userRegister, userDeleteAccount, userForgotPassword, userUpdateUser } = require('./routes/userRoute');


// Create an HTTP server
const server = http.createServer((req, res, next) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  const parsedUrl = url.parse(req.url, true);

  // Route the request based on the path
  switch (parsedUrl.pathname) {
    case '/login':
      userLogin(req, res, next);
      break;
    case '/register':
      userRegister(req, res);
      break;
    case '/forgot-password':
      userForgotPassword(req, res);
      break;
    case '/delete-account':
      userDeleteAccount(req, res);
      break;
    case '/upadate-user':
      userUpdateUser(req, res);
      break;
    default:
      // Handle unknown routes
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
