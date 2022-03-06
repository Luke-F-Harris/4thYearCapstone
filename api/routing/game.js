const userAuth = require("../services/auth.js").userAuth;
const games = require("../database/models/games");
const codes = require("../database/models/codes");
const fs = require("fs");
const logger = require("../services/logging").logger;
var path = require('path');


const replace = require('replace-in-file');
const { execFile, exec, spawn } = require("child_process");
var buildScriptPath = "../Capstone/Unity-Capstone/Assets/Editor/GameBuilder.cs"
var buildBatchFilePath = "../Capstone/Unity-Capstone/runWebGL.bat"


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
            codes.query(codes.getCodeById(code_id), (err, result) => {
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
                    }
                    else {
                        let code = result[0].code;
                        code = Buffer.from(code, "base64").toString();
                        // let code_path = "../Capstone/Unity-Capstone/Assets/Scripts/Code.cs";
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

                                //edit build path of unity to C:/Capstone/Builds/Game_id
                                let buildGamePath = `C:/Capstone/Builds/${code_id}`

                                const options = {
                                    files: [buildScriptPath, buildBatchFilePath],
                                    from: [/buildPlayerOptions.locationPathName = .*/, /--data .+?(?=\s)/],
                                    to: [`buildPlayerOptions.locationPathName = \"${buildGamePath}\";`, `--data "{\\"index_file_path\\":\\"${buildGamePath}\\"}"`]
                                };

                                var newBatchPath = `${__dirname}//..//..//Capstone//Unity-Capstone//runWebGL.bat`


                                //change game build path specific to the code id
                                replace(options)
                                    .then(results => {
                                        console.log(results)
                                        exec(newBatchPath, (err, stdout, stderr) => {
                                            if (err) {
                                                logger.error(err);
                                                res.status(500);
                                                res.json({
                                                    message: "Batch file error",
                                                });
                                            } else {
                                                const outcome = "pending";
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

                                                console.log(`stdout: ${stdout}`);
                                            }
                                        });
                                    })
                                    .catch(error => {
                                        logger.error('Error occurred:', error);
                                        res.status(500);
                                        res.json({
                                            message: "Error occurred",
                                        });
                                    });
                            }
                        });
                    }
                }
            });
        }
    });

    app.post("/api/games/end", (req, res, next) => {
        // Send index file path here.
        const index_file_path = req.body.index_file_path;
        console.log(index_file_path);
        // Render game, then determine the outcome and the duration.

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
