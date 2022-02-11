// Find out what is happing with logging?

const Logger = require('../pirate_game/Logger');

const test_log = Logger.init('log_2.txt');

// Static, dont reference instance
// This logs to log_2.txt
Logger.log("test");

// This does not log to log_2.txt
//test_log.log("test");