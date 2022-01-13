// Handle all of the user routing.
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = require("../database/models/users");
const db = require("../database/connect");
const { normal_sanitizer, email_verifier } = require("../services/sanitize");
const logger = require("../services/logging").logger;

let generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "6h",
    });
};

module.exports = function(app) {
    app.post("/api/cred/login", (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        if (username && password) {
            username = normal_sanitizer(username);
            db.query(users.search_users(username), (err, result) => {
                if (err) {
                    res.status(400);
                    res.json({
                        message: "Error",
                    });
                    throw err;
                }
                if (result.length === 0) {
                    res.status(400);
                    res.json({
                        message: "Invalid login attempt",
                    });
                } else {
                    bcrypt.compare(
                        password,
                        result[0].password,
                        (err, result) => {
                            if (result) {
                                db.query(
                                    users.search_users_soft(username),
                                    (err, u) => {
                                        if (u.length !== 1) {
                                            res.status(400);
                                            res.json({
                                                message: "Invalid login attempt",
                                            });
                                        } else {
                                            res.status(200);
                                            res.json({
                                                message: "Successfully logged in",
                                                user: u[0],
                                                token: generateToken(u[0]),
                                            });
                                            logger.info(
                                                `${u[0].username} logged in`
                                            );
                                        }
                                    }
                                );
                            } else {
                                res.status(400);
                                res.json({
                                    message: "Invalid login attempt",
                                });
                            }
                        }
                    );
                }
            });
        } else {
            res.status(400);
            res.json({
                message: "Invalid login attempt",
            });
        }
    });

    // Do we want them to sign in after successful registration?
    app.post("/api/cred/register", (req, res) => {
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
                            logger.error(err);
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
                                        logger.error(err);
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
                                                    logger.error(err);
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
                                                                    message: "Error",
                                                                });
                                                                logger.error(
                                                                    err
                                                                );
                                                                throw err;
                                                            } else {
                                                                res.status(200);
                                                                res.json({
                                                                    message: "Successfully registered",
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
                                            "Registration"
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
                                "Registration"
                            );
                        }
                    }
                );
            } else {
                res.status(400);
                res.json({
                    message: "Passwords do not match",
                });
                logger.warning("Passwords do not match", "Registration");
            }
        } else {
            res.status(400);
            res.json({
                message: "Invalid email",
            });
            logger.warning("Invalid email", "Registration");
        }
    });

    // Authentication test
    // app.get('/u/user', (req, res) => {
    //     let token = req.headers.authorization;
    //     if (token) {
    //         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //             if (err) {
    //                 res.status(400);
    //                 res.json({
    //                     message: 'Invalid token'
    //                 });
    //             }
    //             else {
    //                 res.status(200);
    //                 res.json({
    //                     message: 'Successfully logged in',
    //                     user: decoded.user
    //                 });
    //             }
    //         });
    //     }
    //     else {
    //         res.status(400);
    //         res.json({
    //             message: 'Invalid token'
    //         });
    //     }
    // });
};