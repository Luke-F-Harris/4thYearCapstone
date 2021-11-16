// Handle all of the user routing.
const bcrypt = require('bcrypt');
const users = require('../database/models/users');
const db = require('../database/connect');
let jwt = require('jsonwebtoken');

require('dotenv').config();

let generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}

module.exports = function (app) {
    app.post('/login', (req, res) => {
        console.log(req.body);
        let username = req.body.username;
        let password = req.body.password;
        db.query(users.search_users(username), (err, result) => {
            if (err) {
                res.status(400);
                res.json({
                    message: 'Error'
                });
                throw err;
            }
            if (result.length === 0) {
                res.status(400)
                res.json({
                    message: 'Invalid login attempt'
                });
            }
            else {
                bcrypt.compare(password, result[0].password, (err, result) => {
                    if (result) {
                        res.status(200);
                        res.json({
                            message: 'Successfully logged in',
                            user: result,
                            token: generateToken(result)
                        });
                    }
                    else {
                        res.status(400)
                        res.json({
                            message: 'Invalid login attempt'
                        });
                    }
                });
            }
        });
    });


    // Do we want them to sign in after successful registration?
    app.post('/register', (req, res) => {
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let password_confirm = req.body.password_confirm;

        if (password === password_confirm) {
            db.query(users.search_user_usernames(username), (err, result) => {
                if (err) {
                    res.status(400);
                    res.json({
                        message: 'Error'
                    });
                    console.log(err);
                    throw err;
                }
                if (result.length === 0) {
                    db.query(users.search_user_emails(email), (err, result) => {
                        if (err) {
                            res.status(400);
                            res.json({
                                message: 'Error'
                            });
                            console.log(err);
                            throw err;
                        }
                        if (result.length === 0) {
                            bcrypt.hash(password, 10, (err, hash) => {
                                if (err) {
                                    res.status(400);
                                    res.json({
                                        message: 'Error'
                                    });
                                    console.log(err);
                                    throw err;
                                }
                                else {
                                    db.query(users.insert_user(first_name, last_name, username, email, hash), (err, result) => {
                                        if (err) {
                                            res.status(400);
                                            res.json({
                                                message: 'Error'
                                            });
                                            console.log(err);
                                            throw err;
                                        }
                                        else {
                                            res.status(200);
                                            res.json({
                                                message: 'Successfully registered',
                                                user: result
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            res.status(400);
                            res.json({
                                message: 'Email already in use'
                            });
                        }
                    });
                }
                else {
                    res.status(400);
                    res.json({
                        message: 'Username already in use'
                    });
                }
            });
        }
        else {
            res.status(400);
            res.json({
                message: 'Passwords do not match'
            });
        }
    });
}

