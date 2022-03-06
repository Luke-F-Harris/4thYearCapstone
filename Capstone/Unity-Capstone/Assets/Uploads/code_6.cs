// // const express = require('express');
// // require('dotenv').config();
// // const bcrypt = require('bcrypt');
// // const jwt = require('jsonwebtoken');

// // require('./config/database').connect();
// // const user = require('./model/user');

// // const app = express();

// // app.use(express.json());

// // app.post("/register", (req, res) => {
    // // const { first_name, last_name, email, password } = req.body;

    // // if (!(email && password && first_name && last_name)) {
        // // res.status(400).send("all input is required");
    // // }
    // // const olduser = user.findone({ email });
    // // if (olduser) {
        // // res.status(409).send("user already exists");
    // // }
    // // const salt = bcrypt.gensaltsync(10);
    // // const hash = bcrypt.hashsync(password, salt);
    // // const user = new user({
        // // first_name,
        // // last_name,
        // // email,
        // // password: hash
    // // });
    // // const token = jwt.sign(
        // // { id: user._id, email: email },
        // // process.env.token,
        // // { expiresin: '1h' }
    // // );
    // // user.token = token;

// // });

// // app.post("/login", (req, res) => {
    // // // our login logic goes here
// // });

// // module.exports = app;

