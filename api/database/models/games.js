const db = require("../connect");

let query = (q, data) => {
    return new Promise((resolve, reject) => {
        db.query(q, data, (err, res) => (err ? reject(err) : resolve(res)));
    });
};

let games = () => {
    return `SELECT * FROM games`;
};

let insert_game = (winner_code, loser_code, winner_score, loser_score, log) => {
    return `INSERT INTO games (winner_code, loser_code, winner_score, loser_score, log) VALUES (${winner_code}, ${loser_code}, ${winner_score}, ${loser_score}, '${log}')`;
};

module.exports = {
    query,
    games,
    insert_game,
};
