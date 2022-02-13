// This should be run standalone

const db = require("../connect");
//require('../../services/logging').logger

// the tables

// the table structures. Use (2^x) -1 increments for data sizes
const users = {
    name: "users",
    features: [
        "id INT AUTO_INCREMENT PRIMARY KEY",
        "created DATETIME NOT NULL DEFAULT NOW()",
        "first_name VARCHAR(255)",
        "last_name VARCHAR(225)",
        "username VARCHAR(255) UNIQUE",
        "email VARCHAR(255) UNIQUE",
        'role ENUM("user", "admin")',
        "password VARCHAR(255)",
        "score INT NOT NULL DEFAULT 1000",
        "ranking INT NOT NULL DEFAULT -1",
    ].join(", "),
};

const codes = {
    name: "codes",
    features: [
        "code_id INT AUTO_INCREMENT PRIMARY KEY",
        "submitted DATETIME NOT NULL DEFAULT NOW()",
        "creator INT references users.id",
        "code TEXT(131071)",
        "ranking INT",
    ].join(", "),
};

const games = {
    name: "games",
    features: [
        "game_id INT AUTO_INCREMENT PRIMARY KEY",
        "initialized DATETIME NOT NULL DEFAULT NOW()",
        "winner_code INT references codes.code_id",
        "loser_code INT references codes.code_id",
        "winner_score INT",
        "loser_score INT",
        "log TEXT(65535)",
    ].join(", "),
};

const tables = [users, codes, games];
// RESET WILL DELETE ALL DATA IN THE DATABASE.
function setup(reset = false, reset_only = false) {
    // Reset procedure
    if (reset) {
        tables.forEach((table) => {
            db.query(`DROP TABLE IF EXISTS ${table.name}`, (err, res) => {
                if (err) {
                    throw err;
                }
            });
        });
    }

    // Table creation
    if (!reset_only) {
        tables.forEach((table) => {
            db.query(
                `CREATE TABLE IF NOT EXISTS ${table.name} (${table.features})`,
                (err, res) => {
                    if (err) {
                        throw err;
                    }
                }
            );
        });
    }

    // Close connection
}

const kill = () => {
    db.end();
};

module.exports = { setup, kill };
