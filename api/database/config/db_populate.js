// Populate the database with samples.
const fs = require('fs');
const axios = require('axios')

let files = ['users.sql', 'codes.sql', 'games.sql']
let alt_files = ['users.json', 'codes.json', 'games.json']
count = 0;
// Iterate over each file and run the queries. If we are successful, close the connection.
module.exports = function () {
    fs.readFile(`${__dirname}/data/users.json`, 'utf8', (err, data) => {
        if (err) throw err;
        let users = JSON.parse(data);
        users.forEach(user => {
            axios.post('http://localhost:3000/api/cred/register', user)
                .then(res => {
                    count++;
                    console.log(`${count}: users added`, "Database");
                })
                .catch(err => {
                    console.log("User addition error");
                });
        });
    });
    fs.readFile(`${__dirname}/data/codes.json`, 'utf8', (err, data) => {
        if (err) throw err;
        let codes = JSON.parse(data);
        codes.forEach(code => {
            axios.post('http://localhost:3000/api/codes/create', code)
                .then(res => {

                    count++;
                    console.log(`${count}: codes added`, "Database");
                })
                .catch(err => {
                    console.log("error")
                })
        })
    })

    //     
    //     codes.forEach(code => {
    //         axios.post('http://localhost:3000/api/codes/create', code)
    //             .then(res => {
    //                 count++;
    //                 logger.info(`${count} codes added`, "Database");
    //             })
    //             .catch(err => {

    //                 logger.error(err);
    //             })
    //     })
    // })




    // files.forEach(file => {
    //     // Read file the
    //     let sql = fs.readFileSync(`${__dirname}/data/${file}`, 'utf8');
    //     // Run the queries.
    //     let lines = sql.split('\n');
    //     lines.forEach(line => {
    //         if (line.trim().length > 0) {
    //             db.query(line, (err, res) => {
    //                 if (err) {
    //                     console.log(err);
    //                 }
    //             });
    //         }
    //     });
    //     count++;

    //     // Close the connection.
    //     if (count === files.length) {
    //         db.end();
    //     }
    // });
}