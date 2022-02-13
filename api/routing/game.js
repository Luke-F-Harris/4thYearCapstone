const userAuth = require("../services/auth.js").userAuth;
const games = require("../database/models/games");
require("../services/logging").logger;

// What type of permissions do these routes need?

module.exports = function (app) {
    app.get("/api/games/all", (req, res, next) => {
        games.query(games.games(), (err, res) => {
            if (err) {
                logger.error(err);
                res.status(500);
                res.json({
                    message: "Error getting games",
                });
            } else {
                res.status(200);
                res.json(res);
            }
        });
    });
    app.post("/api/games", userAuth, (req, res, next) => {
        const creator_id = req.user.id;
        const code_id = req.body.code_id;
        const level = req.body.level;
        const outcome = req.body.outcome;
        games.query(
            games.insert_game(
                creator_id,
                code_id,
                level,
                outcome
            ),
            (err, res) => {
                if (err) {
                    logger.log(err);
                    res.status(500);
                    res.json({
                        message: "Error adding game",
                    });
                } else {
                    res.status(200);
                    res.json(res);
                }
            }
        );
    });
};
