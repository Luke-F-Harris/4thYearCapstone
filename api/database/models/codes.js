const db = require("../connect");

let query = (q, data) => {
    return new Promise((resolve, reject) => {
        db.query(q, data, (err, res) => (err ? reject(err) : resolve(res)));
    });
};

let insert_code = (creator, code) => {
    return `INSERT INTO codes (creator_id, code) VALUES ("${creator}", "${code}")`;
};
let get_code = (id) => {
    return `SELECT * FROM codes WHERE id = "${id}"`;
}


module.exports = {
    query,
    insert_code,
    get_code,
};
