let userAuth = require('../services/auth').userAuth;
require('../services/logging').logger

// All user operations could go here. Notice the use of userAuth middleware.

module.exports = function (app) {

    // Check if theyre logged in
    app.get('/api/user/auth', userAuth, (req, res, next) => {
        let state = req.login_state
        res.status(state.status);
        res.json({
            message: state.message,
            user: state.user
        });
    })

    app.get('/api/user/stats', userAuth, (req, res, next) => {
        let state = req.login_state


        res.status(state.status);
        res.json({
            message: state.message,
            user: state.user
        });
    })

}