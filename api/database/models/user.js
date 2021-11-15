// Create a generic structure for a user, convert it into SQL syntax, and insert.

const db = require('../connect');

let user = (name, email, password) => {
    db.query(`INSERT INTO user VALUES (${name}, ${email}, ${password});`, (err, result) => {
        if (err) {
            throw err;
        }
    });
    db.end();
    return true;

}

module.exports = user;