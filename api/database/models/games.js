const db = require("../connect");

let query = (q, data) => {
    return new Promise((resolve, reject) => {
        db.query(q, data, (err, res) => (err ? reject(err) : resolve(res)));
    });
};

let games = () => {
    return `SELECT * FROM games`;
};

let insert_game = (creator_id, code_id, level, outcome) => {
    return `INSERT INTO games (creator_id, code_id, level, outcome) VALUES ("${creator_id}", "${code_id}", "${level}", "${outcome}")`;
};

module.exports = {
    query,
    games,
    insert_game,
};
