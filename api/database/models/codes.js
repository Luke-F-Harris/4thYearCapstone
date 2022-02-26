const db = require("../connect");

let query = (q, data) => {
    return new Promise((resolve, reject) => {
        db.query(q, data, (err, res) => (err ? reject(err) : resolve(res)));
    });
};

let insert_code = (creator, name, code) => {
    return `INSERT INTO codes (creator_id, name, code) VALUES ("${creator}", "${name}", "${code}")`;
};
let get_code = (id) => {
    return `SELECT * FROM codes WHERE id = "${id}"`;
}
let codes = (player_id) => {
    return `SELECT * FROM codes WHERE creator_id = "${player_id}"`;
}

module.exports = {
    query,
    insert_code,
    get_code,
    codes,
};
// Alter table codes to add a column for the name
