const db = require("../connect");

let query = (q, data) => {
    return new Promise((resolve, reject) => {
        db.query(q, data, (err, res) => (err ? reject(err) : resolve(res)));
    });
};

let games = () => {
    return `SELECT * FROM games`;
};
let get_user_games = (id) => `SELECT * FROM games WHERE games.creator_id = "${id}"`

let insert_game = (creator_id, code_id, level, outcome) => {
    return `INSERT INTO games (creator_id, code_id, level, outcome) VALUES ("${creator_id}", "${code_id}", "${level}", "${outcome}")`;
};
let get_current_game_id = () => "SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'capstone' AND TABLE_NAME = 'games'";

module.exports = {
    query,
    games,
    insert_game,
    get_user_games,
    get_current_game_id
};
