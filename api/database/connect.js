const mysql = require("mysql");

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    database: "capstone",
    password: "root",
});

db.connect((err) => {
    if (err) {
        throw err;
    }
});

module.exports = db;
