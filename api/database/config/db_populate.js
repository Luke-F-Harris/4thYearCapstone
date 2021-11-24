// Populate the database with samples.
const fs = require('fs');
const db = require('../connect');

['users.sql', 'codes.sql', 'games.sql'].forEach(file => {
    fs.readFile(`config/sql/${file}`, 'utf8', (err, data) => {
        if (err) throw err;
        data = data.split('\n');
        data.forEach(line => {
            if (line.length > 0) {
                db.query(line);
            }
        });
    });
})

//db.end();