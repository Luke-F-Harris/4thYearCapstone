// import for file management
const fs = require('fs');
// file for logging
let file_log;


class Log {
    // initializes the logging file
    static init(file_path) {
        file_log = fs.createWriteStream(file_path, { flags: 'w' })
    }

    // called to write to the logging file
    static log(lines) {
        console.log(lines);
        file_log.write(lines + '\n')
    }
}

module.exports = Log