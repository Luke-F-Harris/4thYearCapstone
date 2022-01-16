const fs = require('fs');
let file_log

class logs {
    static init(file_path){
        file_log = fs.createWriteStream(file_path,{flags: 'w'})
    }
    static log(lines){
        file_log.write(lines + '\n')
    }
}