const db = require('./utils/database');

module.exports = class User{
    constructor(id, email, password, firstName, lastName){
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    save(){
        return db.execute('INSERT INTO users(email, password, firstName, lastName) VALUES(?,?,?,?)',
        [this.email, this.password, this.firstName, this.lastName]);
    }

    static deleteById(id){
        return db.execute('DELETE FROM users WHERE id=?', [id]);
    }

    static findById(id){
        return db.execute('SELECT * FROM users WHERE id=?', [id]);
    }

}