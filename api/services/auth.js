const jsonwebtoken = require("jsonwebtoken");
require("./logging").logger;

require("dotenv").config();

// This is the middlewares for the authenticated routes.

let userAuth = (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jsonwebtoken.verify(token, "IjWJqlKu2IqMjl2pV7rF");
    if (decoded.user.role === "user" || decoded.user.role === "admin") {
        req.login_state = {
            message: "Authenticated",
            user: decoded.user,
            status: 200,
        };
        next();
    } else {
        req.login_state = {
            message: "Invalid authentication",
            user: false,
            status: 400,
        };
        next();
    }
};

let adminAuth = (req, res) => {
    const token = req.headers.authorization;
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (decoded.user.role === "admin") {
        res.status(200);
        res.json({
            message: "Successfully logged in",
            user: decoded.user,
        });
    } else {
        res.status(400);
        res.json({
            message: "Invalid token",
        });
    }
};

module.exports = {
    userAuth,
    adminAuth,
};
