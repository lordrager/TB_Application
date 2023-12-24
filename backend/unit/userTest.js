const request = require('supertest'); 
const app = require('../app'); // main app

const { 
  userLogin,
  userRegister,
  userForgotPassword,
  userDeleteAccount,
  userUpdateUser
} = require('./userRoute');

describe('User API', () => {

  it('logs in existing user', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'ivan@abv.bg',
        password: '1234567890' 
      });
      
    expect(res.statusCode).toEqual(200);
  });

  it('registers new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'ivan@abv.com',
        password: '1234567890'
      });
    
    expect(res.statusCode).toEqual(200);
  });

  it('sends forgot password email', async () => {
    const res = await request(app)
      .post('/forgot-password')
      .send({
        email: 'lorenzoeccheli003@gmail.com'
      });
    
    expect(res.statusCode).toEqual(200);
  });

  it('deletes user account', async () => {
    const res = await request(app)
      .delete('/delete-account')
      .send({
        id: 1
      });

    expect(res.statusCode).toEqual(200); 
  });

  it('updates user account', async () => {
    const res = await request(app)
      .put('/update-user')
      .send({
        id: 12,
        email: 'ivan@abv.com',
        password: '1234567890',
        firstName: 'Ivan',
        lastName: 'Ivanov'
      });
    
    expect(res.statusCode).toEqual(200);
  });

});