// Create a generic structure for a user, convert it into SQL syntax, and insert.


const db = require('../connect');

const query = (q, data) => {
    return new Promise((resolve, reject) => {
        db.query(q, data, (err, res) => (err ? reject(err) : resolve(res)))
    })
}


// Add check
let insert_user = (first_name, last_name, username, email, role, hash) => {
    return `INSERT INTO users (first_name, last_name, username, email, role, password) VALUES ("${first_name}", "${last_name}", "${username}", "${email}", "${role}","${hash}")`;
}

let get_users = () => {
    return `SELECT * FROM users`;
}

let search_users = (u) => `SELECT id, username, email, password FROM users WHERE username = "${u}" OR email = "${u}"`;

let search_user_emails = (u) => `SELECT id FROM users WHERE email = "${u}"`;

let search_user_usernames = (u) => `SELECT id FROM users WHERE username = "${u}"`;

let search_users_soft = (u) => `SELECT username, email, role FROM users WHERE username = "${u}" OR email = "${u}"`;

module.exports = { insert_user, get_users, search_users, search_user_emails, search_user_usernames, search_users_soft };

// Test insert: INSERT INTO users (first_name, last_name, username, email, password) values ('Andrew', 'Harrop', 'andrewharrop', 'andrew@gmail.com', '$2b$10$e9F4Xx3ARPqgBKXN85tWLe4y7YzPuCSIvFdoruJ6Fl1JTJXEzDpl6');
