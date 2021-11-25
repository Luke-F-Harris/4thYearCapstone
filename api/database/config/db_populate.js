// Populate the database with samples.
const fs = require('fs');
const db = require('../connect');

let files = ['users.sql', 'codes.sql', 'games.sql']
count = 0;
// Iterate over each file and run the queries. If we are successful, close the connection.
module.exports = function () {
    files.forEach(file => {
        // Read file the
        let sql = fs.readFileSync(`${__dirname}/sql/${file}`, 'utf8');
        // Run the queries.
        let lines = sql.split('\n');
        lines.forEach(line => {
            if (line.trim().length > 0) {
                db.query(line, (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
        count++;

        // Close the connection.
        if (count === files.length) {
            db.end();
        }
    });
}