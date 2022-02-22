const userAuth = require("../services/auth.js").userAuth;
const games = require("../database/models/games");
const codes = require("../database/models/codes");
const fs = require("fs");
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

    app.post("/api/game/start", (req, res, next) => {

        // Start game from this route, the code is already posted so we expect to know the id

        let creator_id = req.body.creator_id;
        let code_id = req.body.code_id;
        let level = req.body.level;

        if (!creator_id || !code_id || !level) {
            res.status(400).json({
                message: "Bad Request",
            });
            logger.warning("Bad Request, missing fields");
        }
        else {
            codes.query(codes.get_code(code_id), (err, res) => {
                if (err) {
                    logger.error(err);
                    res.status(500);
                    res.json({
                        message: "Internal Server Error",
                    });
                } else {
                    if (res.length === 0) {
                        res.status(400).json({
                            message: "Bad Request",
                        });
                        logger.warning("Bad Request, missing fields");
                    } else {
                        let code = res[0].code;
                        let unity_dir = "../../4thYearCapstone/Capstone/Unity-Capstone/Uploads/Assets";
                        let file_name = `code_${code_id}.cs`;

                        fs.writeFile(`${unity_dir}/${file_name}`, code, (err) => {
                            if (err) {
                                logger.error(err);
                                res.status(500);
                                res.json({
                                    message: "Internal Server Error",
                                });
                            } else {
                                // Start game from CLI here with the code_id and level as parameters, then intert the outcome
                                /*
                                1. Get output (Outcome value)
                                2. INSERT GAME
                                */



                                res.status(200);
                                res.json({
                                    message: "Success",
                                });
                            }
                        });
                    }
                }
            });
        }
    });



    app.post("/api/games", userAuth, (req, res, next) => {
        // Starting game: upload code, instantiate unity game: this is the big boi


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
                    // Upload the code to unity?

                    res.status(200);
                    res.json(res);
                }
            }
        );
    });
};
