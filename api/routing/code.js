const codes = require("../database/models/codes");
const db = require("../database/connect");
const { normal_sanitizer, email_verifier } = require("../services/sanitize");
const userAuth = require("../services/auth").userAuth;
const { logger } = require("../services/logging");
require("../services/logging").logger;

module.exports = function (app) {
    app.post("/api/codes/create", (req, res) => {
        let creator = req.body.creator_id;
        let code = req.body.code;
        // Code is a file, so we need to convert it to a string
        code = req.body.code.toString();


        if (!code || !creator) {
            res.status(400).json({
                message: "Bad Request",
            });
            logger.warning("Bad Request, missing fields");
        } else {
            codes.query(
                codes.insert_code(creator, code),
                (err, result) => {
                    if (err) {
                        logger.error(err);
                        res.status(500);
                        res.json({
                            message: "Internal Server Error",
                        });
                    } else {
                        // logger.log("Success");
                        res.status(200);
                        res.json({
                            message: "Success",
                        });
                    }
                }
            );
        }
    });
};
