const db = require('../utils/database');

//This is for the email verification. The following code is to store the codes in the DB and then check if the code is correct.
module.exports = class Verification{
    constructor(id, email, user, code){
        this.id = id;
        this.email = email;
        this.user = user;
        this.code = this.code
    }

    save(){
        return db.execute('INSERT INTO email_verification(email, user, code) VALUES(?,?,?,?)',
        [this.email, this.user, this.code]);
    }

    static deleteById(id){
        return db.execute('DELETE FROM email_verification WHERE id=?', [id]);
    }

    static findById(id){
        return db.execute('SELECT * FROM email_verification WHERE id=?', [id]);
    }

    static findByEmail(email){
        return db.execute('SELECT * FROM email_verification WHERE email=?', [email]);
    }

}