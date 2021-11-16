const readline = require('readline');
const bcrypt = require('bcrypt');

require('dotenv').config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const saltRounds = 10;
let passgen = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

rl.question("Enter password:", function (password) {
    passgen(password).then(hash => {
        console.log(hash);
    });
    rl.close();
});