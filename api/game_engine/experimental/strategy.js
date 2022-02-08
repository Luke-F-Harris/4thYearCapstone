// A well defined class-object structure can be used define strategy objects and functions.

// Define the constants
const StaticConstants = require('../pirate_game/StaticConstants');

// Define the geometry items
const Geometry = require('../pirate_game/Geometry');


// We need a game map parameter to host the interaction space.

/*
    General strategy structure:
    {gameMap}

*/

function sampleStrategy(gameMap) {
    // If there are ships that are undocked, we should dock them to the nearest island.
}

module.exports = sampleStrategy;