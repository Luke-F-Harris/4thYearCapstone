let userAuth = require("../services/auth").userAuth;
require("../services/logging").logger;
const users = require("../database/models/users");
const games = require("../database/models/games");
// All user operations could go here. Notice the use of userAuth middleware.

module.exports = function (app) {
    // Check if theyre logged in
    app.get("/api/user/auth", userAuth, (req, res, next) => {
        let state = req.login_state;
        res.status(state.status);
        res.json({
            message: state.message,
            user: state.user,
        });
    });

    app.get("/api/user/stats", userAuth, (req, res, next) => {
        let state = req.login_state;

        res.status(state.status);
        res.json({
            message: state.message,
            user: state.user,
        });
    });

    app.get("/api/user/all", (req, res, next) => {
        users.query(users.get_users()).then((result) => {

            result.forEach((user) => {
                delete user.password;
            });
            res.status(200);
            res.json(result);
        }).catch((err) => {
            res.status(500);
            res.json(err);
        }
        );
    });
    app.get("/api/user/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        users.query(users.get_user(id)).then((result) => {
            // Remove password
            result = result[0]
            delete result.password;
            res.status(200);
            res.json(result);
        }).catch((err) => {
            res.status(500);
            res.json(err);
        }
        );
    });
    app.get("/api/user/:id/games", (req, res, next) => {
        const id = parseInt(req.params.id);
        
        games.query(games.get_user_games(id)).then((result) => {
            res.status(200);
            res.json(result);
        }).catch((err) => {
            res.status(500);
            res.json(err);
        }
        );
    });


};
