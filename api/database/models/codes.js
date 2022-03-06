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
let get_dates =() => {
    return `SELECT t1.created_at, t1.creator_id, t1.name, t1.id FROM codes t1
    WHERE t1.created_at = (SELECT MAX(t2.created_at)
    FROM codes t2 
    WHERE t2.creator_id = t1.creator_id)`;
}
let delete_code = (user_id, code_id) => {
    return `DELETE FROM codes WHERE creator_id = "${user_id}" AND id = "${code_id}"`;
}

module.exports = {
    query,
    insert_code,
    get_code,
    delete_code,
    codes,
    get_dates,
};
// Alter table codes to add a column for the name
