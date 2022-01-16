// Apply the elo ranking system using the chess method

var Elo_Rating = require("elo-rating");
const EloRating = require("elo-rating/dist/elo-rating");


// get player rating function
var player_rating = 1700;

// get opponent rating function
var opponent_rating = 1800;

// get result of game function
var player_win = false;


var result = EloRating.calculate(player_rating, opponent_rating, player_win)

// Cannot construct this until we have strong database design