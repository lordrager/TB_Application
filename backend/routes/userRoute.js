const querystring = require('querystring');
const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const { emailVerification } = require('../utils/userUtil');


//These "routes" are equivalent to controllers in express
//They are used to handle basic CRUD operations on the database

exports.userLogin = (req, res, next) => {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
  
      req.on('end', async () => {
        req.rawBody = body;
        req.jsonBody = JSON.parse(body);
        const email = req.jsonBody.email;
        const password = req.jsonBody.password;
        const saltRounds = 10;

        User.findByEmail(email)
        .then(([user]) => {
          if (user) {
            bcrypt.compare(password, user[0].password).then(result => {
              if (result) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Login successful');
              } else {
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end('Invalid username or password');
              }
            })
            .catch(err => console.log(err));
          } else { 
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            res.end('Invalid username or password');
          }
        })
        .catch(err => console.log(err));
      });
    } else {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
    }
};

exports.userRegister = (req, res, next) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      req.rawBody = body;
      req.jsonBody = JSON.parse(body);
      const password = req.jsonBody.password;
      const email = req.jsonBody.email;
      const firstName = req.jsonBody.firstName;
      const lastName = req.jsonBody.lastName;
      const saltRounds = 10;

      User.findByEmail(email)
      .then(([user]) => {
        if (user[0].email===email) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Email already exists');
        }
        else {
          bcrypt
          .hash(password, saltRounds)
          .then(hash => {
            const newUser = new User(null, email, hash, firstName, lastName);
            newUser.save().then(() => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Registration successful');
            })
            .catch(err => {
              res.writeHead(400, { 'Content-Type': 'text/plain' });
              res.end('The data is invalid');
            });
          })
          .catch(err => console.error(err.message));
        }
      })
      .catch(err => console.log(err));
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
};


exports.userForgotPassword = (req, res, next) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      req.rawBody = body;
      req.jsonBody = JSON.parse(body);
      const email = req.jsonBody.email;
      emailVerification(email).then(() => {
        console.log('Email sent');
      })
      .catch(err => console.log(err));

    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
  emailVerification(req.body.email).then(() => {
    console.log('Email sent');
  }).catch(err => console.log(err));
};

exports.userDeleteAccount = (req, res, next) => {
  if (req.method === 'DELETE') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const postData = querystring.parse(body);
      const id = postData.id;

      User.deleteById(id).then(() => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Account deleted');
      })
      .catch(err => console.log(err));
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
};

exports.userUpdateUser = (req, res, next) => {
  if (req.method === 'PUT') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      req.rawBody = body;
      req.jsonBody = JSON.parse(body);
      const id = req.jsonBody.id;
      const email = req.jsonBody.email;
      const password = req.jsonBody.password;
      const firstName = req.jsonBody.firstName;
      const lastName = req.jsonBody.lastName;
      const saltRounds = 10;
      bcrypt
      .hash(password, saltRounds)
      .then(hash => {
        User.updateById(id, email, password, firstName, lastName).then(() => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Account updated');
        })
        .catch(err => {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('The data is invalid');
        });
      })
      .catch(err => console.error(err.message));
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
};

// exports.test = (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('Test successful');
//   res.end('Test successful');
// };