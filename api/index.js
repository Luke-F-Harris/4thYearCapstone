const express = require("express");
const { logger } = require("./services/logging");
require("./services/logging").logger;
const cors = require("cors");

const app = express();
const PORT = 3000;

// App configuaration
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.set("trust proxy", true);

// External routes
require("./routing/cred")(app);
require("./routing/user")(app);
require("./routing/game")(app);
require("./routing/code")(app);
require("./routing/dev")(app);
require("./routing/unity")(app);

app.get("/", (req, res) => {
    logger.info("GET /", "API");
    res.json("Hello world");
});

app.get("/logging", (req, res) => {
    logger.info("GET /logging", "API");
    logger.log("info", "This is an info message");
    logger.warning("This is a warning message", "WARN");
    logger.error("This is an error message", "ERROR");
    res.json("Success");
});

app.listen(PORT, () => {
    logger.log(`Server is running on port ${PORT}`, "Server");
});
