// connect to db, create tables if not exist, then populate tables
const fs = require("fs");
const axios = require("axios");
const db = require("./connect");
const path = require("path");
require("../services/logging").logger;

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
    //data: JSON.parse(fs.readFileSync('./config/data/users.json', 'utf8'))
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
    //data: JSON.parse(fs.readFileSync('./config/data/codes.json', 'utf8'))
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
    //data: JSON.parse(fs.readFileSync('./config/data/games.json', 'utf8'))
};

const tables = [users, codes, games];

let create = () => {
    tables.forEach((table) => {
        db.query(
            `CREATE TABLE IF NOT EXISTS ${table.name} (${table.features})`,
            (err, result) => {
                if (err) throw err;
                logger.log(`Table ${table.name} created`, "Database");
                JSON.parse(
                    fs.readFileSync(
                        `database/config/data/${table.name}.json`,
                        "utf8"
                    )
                ).forEach((row) => {
                    axios
                        .post(
                            `http://localhost:3000/api/dev/${table.name}`,
                            row
                        )
                        .then((res) => {
                            logger.log(`${res.data.message}`);
                        })
                        .catch((err) => {
                            logger.error(`${err}`);
                        });
                });
            }
        );
    });
};

module.exports = create;
