const codes = require("../database/models/codes");
const db = require("../database/connect");
const { normal_sanitizer, email_verifier } = require("../services/sanitize");
const userAuth = require("../services/auth").userAuth;
const { logger } = require("../services/logging");
require("../services/logging").logger;


module.exports = function (app) {
    app.post("/api/codes/create", (req, res) => {
        let creator = req.body.creator_id;
        let name = req.body.name;
        let code = req.body.code;

        // if the code is not a csharp file we return error

        // Code is a file, so we need to convert it to a string 
        code = req.body.code.toString();

        // Encode the code because sql does not like "
        code = Buffer.from(code).toString("base64");

        // Do we want to save this here? No

        if (!code || !creator) {
            res.status(400).json({
                message: "Bad Request",
            });
            logger.warning("Bad Request, missing fields");
        } else {
            codes.query(
                codes.insert_code(creator, name, code),
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
      
    app.post("/api/codes/delete/:id/:codeid", userAuth, (req, res) => {
        
        user_id = req.params.id;
        code_id = req.params.codeid;

        codes.query(codes.delete_code(user_id,code_id), (err, result) => {
            if (err) {
                logger.error(err);
                res.status(500);
                res.json({
                    message: "Internal Server Error",
                });
            } else {
                res.status(200);
                res.json({message:"Successfully Deleted"});
            }
        });
    });
    app.get("/api/codes/date", (req, res) => {
       
        codes.query(codes.get_dates(), (err, result) => {
            if (err) {
                logger.error(err);
                res.status(500);
                res.json({
                    message: "Internal Server Error",
                });
            } else {
                res.status(200);
                res.json(result);
            }
        });
    });
    app.get("/api/codes/:id", userAuth, (req, res) => {
       
        const user_id = req.params.id;
        codes.query(codes.codes(creator_id = user_id), (err, result) => {
            if (err) {
                logger.error(err);
                res.status(500);
                res.json({
                    message: "Internal Server Error",
                });
            } else {
                res.status(200);
                res.json(result);
            }
        });
    });
    

};
