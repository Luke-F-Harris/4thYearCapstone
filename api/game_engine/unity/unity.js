const axios = require('axios');


let new_game = (creator_id, code_id, level) => {
    // Response should contain the outcome of the game. Can use this for testing as well
    body = {
        "creator_id": creator_id,
        "code_id": code_id,
        "level": level,
    };
    return axios.post('http://localhost:3000/api/dev/unity', {
        body
    })
        .then(function (response) {
            return response.data;
        }
        )
        .catch(function (error) {
            console.log(error);
        }
        );
    // This route could be used in production if we can generate the correct information from the C#/Game engine complation

};

new_game(1, 1, 1)