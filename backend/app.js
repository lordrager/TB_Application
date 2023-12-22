const http = require('http');
const url = require('url');
const { userLogin, userRegister } = require('./routes/userRoute');


const db = require('./utils/database');

// In-memory storage for user credentials
const users = {
  'user1': { email: 'email', password: 'password1' },
  'user2': { email: 'aha@12', password: 'password2' },
  // Add more users as needed
};

// Create an HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Route the request based on the path
  switch (parsedUrl.pathname) {
    case '/login':
      userLogin(req, res, next);
      break;
    case '/register':
      userRegister(req, res, next);
      break;
    default:
      // Handle unknown routes
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
  }
});

db.execute('SELECT * FROM users').then(result=>{
  console.log(result[0], result[1]);
  console.log('Connected to database!');
}).catch(err =>{
  console.log(err);
  console.log('Could not connect to database!');
});

const PORT = 3100;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
