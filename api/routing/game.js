const userAuth = require("../services/auth.js").userAuth;
const games = require("../database/models/games");
const codes = require("../database/models/codes");
const fs = require("fs");
const logger = require("../services/logging").logger;
var path = require('path');

// What type of permissions do these routes need?

let game_map = {
    "Beginner": 1,
    "Intermediate": 2,
    "Advanced": 3,
    "Expert": 4,
    "Master": 5,
    "Grandmaster": 6,
    "Challenger": 7,
};




module.exports = function (app) {
    app.get("/api/games/all", (req, res, next) => {
        games.query(games.games(), (err, result) => {
            if (err) {
                logger.error(err);
                res.status(500);
                res.json({
                    message: "Error getting games",
                });
            } else {
                res.status(200);
                res.json(result);
            }
        });
    });

    app.post("/api/games/start", (req, res, next) => {

        // Start game from this route, the code is already posted so we expect to know the id

        let creator_id = req.body.creator_id;
        let code_id = req.body.code_id;
        let level = game_map[req.body.level];

        if (!creator_id || !code_id || !level) {
            res.status(400).json({
                message: "Bad Request",
            });
            logger.warning("Bad Request, missing fields");
        }
        else {
            codes.query(codes.get_code(code_id), (err, result) => {
                if (err) {
                    logger.error(err);
                    res.status(500);
                    res.json({
                        message: "Internal Server Error",
                    });
                } else {
                    if (result.length === 0) {
                        res.status(400).json({
                            message: "Bad Request",
                        });
                        logger.warning("Bad Request, missing fields");
                    } else {
                        let code = result[0].code;
                        code = Buffer.from(code, "base64").toString();

                        let file_name = `code_${code_id}.cs`;
                        let file_path = path.join(__dirname, '../../Capstone/Unity-Capstone/Assets/Uploads/', file_name);

                        fs.writeFile(file_path, code, (err) => {
                            if (err) {
                                logger.error(err);
                                res.status(500);
                                res.json({
                                    message: "Internal Server Error",
                                });
                            } else {

                                // Call BAT Files, with the script name as a parameter. Wait for some response?


                                // Generate random outcome (Pending for now?)
                                let outcome = ["win", "lose", "draw"][Math.floor(Math.random() * 3)];


                                games.query(games.insert_game(creator_id, code_id, level, outcome), (err, result) => {
                                    if (err) {
                                        logger.error(err);
                                        res.status(500);
                                        res.json({
                                            message: "Internal Server Error",
                                        });
                                    } else {
                                        res.status(200);
                                        res.json({
                                            message: "Success",
                                            outcome: outcome,
                                        });
                                    }
                                });
                            }




                            // Start game from CLI here with the code_id and level as parameters, then intert the outcome
                            /*
                            Unity listener for init, not api. Respone to game with post to this route
 
                            IN(Level, filename), OUT(Outcome)
                
                            1. Get output (Outcome value)
                            2. INSERT GAME

                            
                            */



                        });
                    }
                }
            });
        }
    });

    app.get("/api/games/end", (req, res, next) => {
        //Add outcome, game length, index.html here

        console.log("End game");

        res.status(200);
        res.json({
            message: "Success",
        });
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
