const games = require('../database/models/games');
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
}