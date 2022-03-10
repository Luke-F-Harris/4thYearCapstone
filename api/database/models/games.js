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

let get_user_games_and_codes = (id) => `SELECT games.id, games.code_id, games.level, games.outcome, codes.code, codes.name FROM games INNER JOIN codes ON games.code_id = codes.id WHERE games.creator_id = "${id}"`;

let insert_game = (creator_id, code_id, level, outcome) => {
    return `INSERT INTO games (creator_id, code_id, level, outcome) VALUES ("${creator_id}", "${code_id}", "${level}", "${outcome}")`;
};

let get_game = (game_id) => {
    return `SELECT * FROM games WHERE id = "${game_id}"`;
};

let get_current_game_id = () => "SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'capstone' AND TABLE_NAME = 'games'";


module.exports = {
    query,
    games,
    insert_game,
    get_user_games,
    get_current_game_id,
    get_game,
    get_user_games_and_codes
<<<<<<< HEAD
};
=======
};
>>>>>>> luke
