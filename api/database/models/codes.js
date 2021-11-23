const db = require('../connect');

let codes = (c) => {
    db.query(`INSERT INTO codes VALUES (${c.code_id}, ${c.submitted}, ${c.creator}, ${c.code}, ${c.ranking});`, (err, result) => {
        if (err) {
            throw err;
        }
    });
    db.end();
    return true;
}