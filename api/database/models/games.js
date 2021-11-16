const db = require('../connect');

let games = (g) => {
    db.query(`INSERT INTO games VALUES (${g.game_id}, ${g.initialized}, ${g.winner_code}, ${g.loser_code}, ${g.winner_score}, ${g.loser_score}, ${g.log});`, (err, result) => {
        if (err) {
            throw err;
        }
    });
    db.end();
    return true;
}