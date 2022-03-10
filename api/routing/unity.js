const codes = require("../database/models/codes");
const db = require("../database/connect");
const { normal_sanitizer, email_verifier } = require("../services/sanitize");
const userAuth = require("../services/auth").userAuth;
const { logger } = require("../services/logging");
const fs = require("fs");
require("../services/logging").logger;



module.exports = function (app) {
    app.post("/api/files/create", (req, res) => {
        let creator = req.body.creator;
        let file = req.body.file;
        let ranking = req.body.ranking;

        if (!code || !creator || !ranking) {
            res.status(400).json({
                message: "Bad Request",
            });
            logger.warning("Bad Request, missing fields");
        } else {
            codes.query(
                codes.insert_code(creator, code, ranking),
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
    app.post("/api/unity/post_here", (req, res) => {
        console.log("unity post")

        console.log(req.body);
        res.status(200).json({
            message: "Success",
        });
    });

    app.get("/api/unity/get_here", (req, res) => {
        console.log("unity get")
        res.status(200).json({
            message: "Success",
        });
    });

    app.post("/api/files/save_code_secret", (req, res) => {
        //. post the code here and then sneak it into unity
        let secret_dir = "../../4thYearCapstone/Capstone/Unity-Capstone/Assets"
        let file_name = "secret.txt"
        let file_body = "Inside your file"
        let file_path = `${secret_dir}/${file_name}`
        fs.writeFile(file_path, file_body, (err) => {
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
        });
    });
    // More custom saves? Later
    app.post("/api/unity/code", (req, res) => {
        let secret_dir = "../../4thYearCapstone/Capstone/Unity-Capstone/Assets"

        // Use this in the upload
        let user = req.body.user;
        let code_id = req.body.code_id;

        

        let file_name = `code_1.cs`;

        let file_body = req.body.code;

        let file_path = `${secret_dir}/${file_name}`;

        fs.writeFile(file_path, file_body, (err) => {
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
        });
    });
};
