const PirateGame = require('../pirate_game/PirateGame');
const Logger = require('../pirate_game/Logger');

const { sampleStrategy } = require('.//strategy');


Logger.init('log.txt');
Logger.log("Logger initialized at " + new Date());
PirateGame.start({
    botName: 'AndrewTestBot',
    preProcessing: map => {
        Logger.log('no data pre-processing performed. number of ships: ' + map.myShips.length)
    },
    strategy: sampleStrategy
})