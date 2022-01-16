const db = require("../connect");

let query = (q, data) => {
    return new Promise((resolve, reject) => {
        db.query(q, data, (err, res) => (err ? reject(err) : resolve(res)));
    });
};

let insert_code = (creator, code, ranking) => {
    return `INSERT INTO codes (creator, code, ranking) VALUES (${creator}, ${code}, ${ranking})`;
};

module.exports = {
    query,
    insert_code,
};
