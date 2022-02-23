// Imports for logging, handling network, and parsing game map
const Logger = require("./Logger")
const Networking = require("./Networking")
const PirateGameMapParser = require("./PirateGameMapParser")

let map_parser = null;


// Pirate Game to be called to get game entity
class PirateGame {

    // Start function of the game
    static start({ bot_name, pre_processing, strategy }) {
        // int value of the turn number
        let turn = 1;

        // reads the networking lines to parse the game data
        Networking.readNLines(2, lines => { // Bottleneck
            const parsed_game_meta = parseGameMeta(lines);
            // creates a logging file for the name of current bot and players id
            Logger.init(`${bot_name}${parsed_game_meta.my_player_id}.log `);
            Logger.log(`game meta:`);

            // writes each line
            for (let i = 0; i < lines.length; i++) {
                Logger.log(lines[i]);
            };
            Logger.log(JSON.stringify(parsed_game_meta));
            map_parser = new PirateGameMapParser(parsedGameMeta);

            startPreProcessing();
        })

        // parses the incoming data and logs it.
        function startPreProcessing() {
            Networking.readLine(line => {
                const game_map = map_parser.parse(line);
                Logger.log('initial map:');
                Logger.log(line);

                if (pre_processing == true) {
                    pre_processing(game_map);
                }

                Networking.writeLine(bot_name);
                startGameLoop();
            });
        }

        // called when game starts and begins to log each turn with the data
        function startGameLoop() {
            Networking.forEachReadLine(line => {
                Logger.log('turn #' + turn + ", map:");
                Logger.log(line);

                const game_map = map_parser.parse(line);
                const moves = strategy(game_map);

                Networking.sendMoves(moves.filter(m => m !== null));
                Logger.log('moves:');
                Logger.log(moves.join(' '));

                turn++;
            })
        }
    }
}

function parseGameMeta(lines) {
    const player_id = parseInt(lines[0]);
    const width_height = lines[1].trim().split(' ');
    return {
        my_player_id: player_id,
        width: parseInt(width_height[0]),
        height: parseInt(width_height[1]),
    }
};

module.exports = PirateGame