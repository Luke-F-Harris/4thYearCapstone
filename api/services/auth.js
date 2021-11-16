// Dep?

const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');

require('dotenv').config()

const saltRounds = 10;

let passgen = (password) => {
    const salt = awaitbcrypt.genSalt(saltRounds)
    const hash = bcrypt.hash(password, salt)
    return hash
};



let generateToken = (user) => {
    return jsonwebtoken.sign(user, process.env.SECRET_KEY, {
        expiresIn: '1h'
    });
}

module.exports = { generateToken };