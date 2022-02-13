const db = require("../connect");

let query = (q, data) => {
    return new Promise((resolve, reject) => {
        db.query(q, data, (err, res) => (err ? reject(err) : resolve(res)));
    });
};

let insert_code = (creator, code) => {
    return `INSERT INTO codes (creator, code) VALUES (${creator}, ${code})`;
};

module.exports = {
    query,
    insert_code,
};
