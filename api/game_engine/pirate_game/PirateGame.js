const Logging = require("./Logging")
const Network = require("./Netowrking")
const PirateGameMapParser = require("./PirateGameMapParser")

let map_parser = null;


class PirateGame {
    static start({ bot_name, pre_processing, strategy }) {
        let turn_number = 1;
        Networking.readNLines(2, lines => {
            const parsed_game_meta = parseGameMeta(lines);
            Logging.init(`${bot_name}${parsed_game_meta.my_player_id}.log `);
            Logging.log(`game meta:`);

            for (let i = 0; i < lines.length; i++) {
                Logging.log(lines[i]);
            };
            Log.log(JSON.stringify(parsed_game_meta));
            map_parser = new PirateGameMapParser(parsedGameMeta);

            startPreProcessing();
        })

        function startPreProcessing() {
            Networking.readLine(line => {
                const game_map = map_parser.parse(line);
                Logging.log('initial map:');
                Logging.log(line);

                if (pre_processing == true) {
                    pre_processing(map);
                }

                Networking.writeLine(bot_name);
                startGameLoop();
            });
        }

        function startGameLoop() {
            Networking.forEachReadLine(line => {
                Logging.log('turn #' + turn_number + ", map:");
                Logging.log(line);

                const game_map = map_parser.parse(line);
                const moves = strategy(map);

                Networking.sendMoves(moves.filter(m => m !== null));
                Logging.log('moves:');
                Logging.log(moves.join(' '));

                turn_number++;
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