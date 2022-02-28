let userAuth = require("../services/auth").userAuth;
require("../services/logging").logger;
const users = require("../database/models/users");
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
            res.status(200);
            res.json(result);
        }).catch((err) => {
            res.status(500);
            res.json(err);
        }
        );
    });

};
