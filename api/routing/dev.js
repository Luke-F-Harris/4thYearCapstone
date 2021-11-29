// Routing for development only
const development = require("../services/environment_check").development;
const { normal_sanitizer, email_verifier } = require("../services/sanitize");
const users = require("../database/models/users");
const codes = require("../database/models/codes");
const games = require("../database/models/games");
const init = require("../database/init");
const db = require("../database/connect");
const logger = require("../services/logging").logger;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (app) {
    app.post("/api/dev/users", development, (req, res, next) => {
        logger.warning("Dev users endpoint called");
        let first_name = normal_sanitizer(req.body.first_name);
        let last_name = normal_sanitizer(req.body.last_name);
        let username = normal_sanitizer(req.body.username);
        let email = normal_sanitizer(req.body.email);
        let password = req.body.password;
        let password_confirm = req.body.password_confirm;
        let role = "user";
        if (email_verifier(email)) {
            if (password === password_confirm) {
                db.query(
                    users.search_user_usernames(username),
                    (err, result) => {
                        if (err) {
                            res.status(400);
                            res.json({
                                message: "Error",
                            });
                            logger.log(err);
                            throw err;
                        }
                        if (result.length === 0) {
                            db.query(
                                users.search_user_emails(email),
                                (err, result) => {
                                    if (err) {
                                        res.status(400);
                                        res.json({
                                            message: "Error",
                                        });
                                        logger.log(err);
                                        throw err;
                                    }
                                    if (result.length === 0) {
                                        bcrypt.hash(
                                            password,
                                            10,
                                            (err, hash) => {
                                                if (err) {
                                                    res.status(400);
                                                    res.json({
                                                        message: "Error",
                                                    });
                                                    logger.log(err);
                                                    throw err;
                                                } else {
                                                    db.query(
                                                        users.insert_user(
                                                            first_name,
                                                            last_name,
                                                            username,
                                                            email,
                                                            role,
                                                            hash
                                                        ),
                                                        (err, result) => {
                                                            if (err) {
                                                                res.status(400);
                                                                res.json({
                                                                    message:
                                                                        "Error",
                                                                });
                                                                logger.log(err);
                                                                throw err;
                                                            } else {
                                                                res.status(200);
                                                                res.json({
                                                                    message:
                                                                        "Successfully registered",
                                                                    user: result,
                                                                });
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    } else {
                                        res.status(400);
                                        res.json({
                                            message: "Email already in use",
                                        });
                                        logger.warning(
                                            "Email already in use",
                                            "Regstration"
                                        );
                                    }
                                }
                            );
                        } else {
                            res.status(400);
                            res.json({
                                message: "Username already in use",
                            });
                            logger.warning(
                                "Username already in use",
                                "Regstration"
                            );
                        }
                    }
                );
            } else {
                res.status(400);
                res.json({
                    message: "Passwords do not match",
                });
                logger.warning("Passwords do not match", "Regstration");
            }
        } else {
            res.status(400);
            res.json({
                message: "Invalid email",
            });
            logger.warning("Invalid email", "Regstration");
        }
    });
    app.post("/api/dev/codes", development, (req, res, next) => {
        logger.warning("Dev codes endpoint called");
        let creator = req.body.creator;
        let code = req.body.code;
        let ranking = req.body.ranking;

        if (!code || !creator || !ranking) {
            res.status(400).json({
                message: "Bad Request",
            });
            logger.error("Bad request in /api/dev/codes");
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
                        logger.log("DB insert success in /api/dev/codes");
                        res.status(200);
                        res.json({
                            message: "Success",
                        });
                    }
                }
            );
        }
    });
    app.post("/api/dev/games", development, (req, res, next) => {
        logger.warning("Dev games endpoint called");
        const winner_code = req.body.winner_code;
        const loser_code = req.body.loser_code;
        const winner_id = req.body.winner_score;
        const loser_id = req.body.loser_score;
        const log = req.body.log;

        db.query(
            games.insert_game(
                winner_code,
                loser_code,
                winner_id,
                loser_id,
                log
            ),
            (err, result) => {
                if (err) {
                    logger.log(err);
                    res.status(500);
                    res.json({
                        message: "Internal Server Error",
                    });
                } else {
                    logger.log("Successful game update");
                    res.status(200);
                    res.json({
                        message: "Success",
                    });
                }
            }
        );
    });
    app.post("/api/dev/reset_db", development, (req, res, next) => {
        logger.warning("Dev reset_db endpoint called");
        const reset_code = req.body.reset_code;
        if (reset_code === process.env.RESET_CODE) {
            let error = false;
            const tables = ["users", "codes", "games"];
            tables.forEach((table) => {
                db.query(`DELETE FROM ${table}`, (err, result) => {
                    if (err) {
                        logger.error(err);
                        error = true;
                    } else {
                        logger.info(
                            `Successfully reset table: ${table}`,
                            "Database"
                        );
                    }
                });
            });
            if (error) {
                res.status(500);
                res.json({
                    message: "Internal Server Error",
                });
            } else {
                res.status(200);
                res.json({
                    message: "Success",
                });
            }
        } else {
            res.status(400);
            res.json({
                message: "Bad Request",
            });
            logger.error("Bad Request", "Reset DB");
        }
    });
    app.post("/api/dev/init", (req, res, next) => {
        logger.warning("Dev init endpoint called");
        init();
        // Add error handling
        res.status(200);
        res.json({
            message: "Success",
        });
    });
};
