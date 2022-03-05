const db = require("./connect");

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
        "id SERIAL PRIMARY KEY",
        "creator_id INTEGER references users(id)",
        "created_at TIMESTAMP DEFAULT NOW()",
        "code TEXT(16384)",
        "name VARCHAR(255)",
    ].join(", "),
};

const games = {
    name: "games",
    features: [
        "id SERIAL PRIMARY KEY",
        "creator_id INTEGER references users(id)",
        "code_id INTEGER references codes(id)",
        "created_at TIMESTAMP DEFAULT NOW()",
        "level INTEGER",
        "outcome ENUM('win', 'lose', 'draw', 'pending')",
    ].join(", "),
};

const tables = [users, codes, games];

// Get args from the command line
const args = process.argv.slice(2);

if (args[0] === "--reset" && args[1] === "--all") {
    [codes, games].forEach((table) => {
        db.query(`DROP TABLE IF EXISTS ${table.name}`, (err, res) => {
            if (err) {
                throw err;
            }
        });
    });
}
if (args[0] === "--reset" && args.length == 1) {
    [codes, games].forEach((table) => {
        db.query(`DROP TABLE IF EXISTS ${table.name}`, (err, res) => {
            if (err) {
                throw err;
            }
        });
    });
}

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

