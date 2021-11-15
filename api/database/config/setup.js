// The purpose of a database setup file is to define the database schema if not already defined.

const db = require('../connect');

// Strings for the table features
const user_features = "id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255)"

function setup() {
    db.query(`CREATE TABLE IF NOT EXISTS users (${user_features})`, (err, result) => {  // 
        if (err) {
            throw err;
        }
    }
    );
    db.end();
}
setup();