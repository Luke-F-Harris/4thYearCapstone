// Create a generic structure for a user, convert it into SQL syntax, and insert.


const db = require('../connect');

let user = (u) => {
    db.query(`INSERT INTO user VALUES (${u.first_name}, ${u.last_name}, ${u.username}, ${u.email}, ${u.password});`, (err, result) => {
        if (err) {
            throw err;
        }
    });
    db.end();
    return true;

}

module.exports = user;