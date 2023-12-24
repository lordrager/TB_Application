const db = require('../utils/database');

module.exports = class User{
    constructor(id, email, password, firstName, lastName){
        this.id = id;
        this.email = email;
        //It is better to add the bcrypt method here on create for cleaner code
        //I must implement token logic
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    save(){
        return db.execute('INSERT INTO users(email, password, first_name, last_name) VALUES(?,?,?,?)',
        [this.email, this.password, this.firstName, this.lastName]);
    }

    static deleteById(id){
        return db.execute('DELETE FROM users WHERE id=?', [id]);
    }

    static findById(id){
        return db.execute('SELECT * FROM users WHERE id=?', [id]);
    }

    static findByEmail(email){
        return db.execute('SELECT * FROM users WHERE email=?', [email]);
    }

    static updateById(id, email, password, firstName, lastName){
        return db.execute('UPDATE users SET email=?, password=?, first_name=?, last_name=? WHERE id=?',
        [email, password, firstName, lastName, id]);
    }

}