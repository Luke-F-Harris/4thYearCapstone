// A well defined class-object structure can be used define strategy objects and functions.

// Define the constants
const StaticConstants = require('../pirate_game/StaticConstants');

// Define the geometry items
const Geometry = require('../pirate_game/Geometry');
const { moveCursor } = require('readline');


// We need a game map parameter to host the interaction space.

/*
    General strategy structure:
    {gameMap}

*/

function sampleStrategy(gameMap) {
    // If there are ships that are undocked, we should dock them to the nearest island.
    const moves = gameMap.myShips
        .filter(s => s.isUndocked())
        .map(ship => {
            // find the planets that are free or occupied by you
            const planetsOfInterest = gameMap.planets.filter(p => p.isFree() ||
                (p.isOwnedByMe() && p.hasDockingSpot()));

            if (planetsOfInterest.length === 0) {
                return null; // if all the planets are taken we return null - no move for this ship
            }

            // sorting planets based on the distance to the ship
            const sortedPlants = [...planetsOfInterest].sort((a, b) => Geometry.distance(ship, a) - Geometry.distance(ship, b));
            const chosenPlanet = sortedPlants[0];

            if (ship.canDock(chosenPlanet)) {
                return ship.dock(chosenPlanet);
            } else {
                return ship.navigate({
                    target: chosenPlanet,
                    keepDistanceToTarget: chosenPlanet.radius + 3,
                    speed: constants.MAX_SPEED / 2,
                    avoidObstacles: true,
                    ignoreShips: false
                });
            }
        });
    return moves;
}

module.exports = sampleStrategy;