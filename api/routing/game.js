const userAuth = require('../services/auth.js').userAuth
const games = require('../database/models/games');
require('../services/logging').logger

// What type of permissions do these routes need?

module.exports = function (app) {
    app.get('/api/games/all', (req, res, next) => {
        games.query(games.games(), (err, res) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({
                    message: 'Error getting games'
                });
            } else {
                res.status(200);
                res.json(res);
            }
        });
    });
    app.post('/api/games/code', userAuth, (req, res, next) => {
        const winner_code = req.body.winner_code;
        const loser_code = req.body.loser_code;
        const winner_id = req.body.winner_score;
        const loser_id = req.body.loser_score;
        const log = req.body.log;

        games.query(games.insert_game(winner_code, loser_code, winner_id, loser_id, log), (err, res) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({
                    message: 'Error adding game'
                });
            } else {
                res.status(200);
                res.json(res);
            }

        });

    })
}