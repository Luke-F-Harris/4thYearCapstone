const db = require("../connect");

let query = (q, data) => {
    return new Promise((resolve, reject) => {
        db.query(q, data, (err, res) => (err ? reject(err) : resolve(res)));
    });
};

let get_game = (game_id) => {
    return `SELECT * FROM index_map WHERE game_id = "${game_id}"`;
}

let insert_map = (game_id, index_location) => {
    return `INSERT INTO index_map (game_id, index_location) VALUES ("${game_id}", "${index_location}")`;
}


module.exports = {
    query,
    get_game,
    insert_map
};
