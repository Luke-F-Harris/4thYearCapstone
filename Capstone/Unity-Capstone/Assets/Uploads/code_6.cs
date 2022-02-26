// const express = require('express');
// require('dotenv').config();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// require('./config/database').connect();
// const User = require('./model/user');

// const app = express();

// app.use(express.json());

// app.post("/register", (req, res) => {
//     const { first_name, last_name, email, password } = req.body;

//     if (!(email && password && first_name && last_name)) {
//         res.status(400).send("All input is required");
//     }
//     const oldUser = User.findOne({ email });
//     if (oldUser) {
//         res.status(409).send("User already exists");
//     }
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);
//     const user = new User({
//         first_name,
//         last_name,
//         email,
//         password: hash
//     });
//     const token = jwt.sign(
//         { id: user._id, email: email },
//         process.env.TOKEN,
//         { expiresIn: '1h' }
//     );
//     user.token = token;

// });

// app.post("/login", (req, res) => {
//     // our login logic goes here
// });

// module.exports = app;

