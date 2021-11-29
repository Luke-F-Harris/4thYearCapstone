const dotenv = require("dotenv");

let development = (req, res, next) => {
    environment = process.env.ENVTYPE;
    if (environment === "development") {
        next();
    } else {
        res.status(404).send("Not Found");
    }
};

module.exports = { development };
