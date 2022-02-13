const fs = require("fs");
const axios = require("axios");
const connection = require("./connect");
let files = ["users.sql", "codes.sql", "games.sql"];
const { logger } = require("../services/logging");
require("../services/logging").logger;


// User insert:
fs.readFile(`${__dirname}/config/data/users.json`, "utf8", (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    users.forEach((user) => {
        axios
            .post("http://localhost:3000/api/cred/register", user)
            .then((res) => {
                count++;
                logger.log(`${count}: users added`, "Database");
            })
            .catch((err) => {
                logger.log("User addition error");
            });
    });
});

