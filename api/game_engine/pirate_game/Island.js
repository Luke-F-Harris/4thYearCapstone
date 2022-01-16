const Entity = require('Entity'); 


class Island extends Entity{

    //gameMap map object the island is on
    //props is and object with property values of island
    constructor(game_map, props){
        super(props)// pass in x,y to entity parent class
        this.game_map=game_map;
        this.props=props;
    }

    //returns boolean if island owned
    isIslandOwned(){
        //check if ownerid is invalid
        if(typeof this.props.owner_id !=='undefined' || this.props.owner_id!==null){
            return false;
        }
    }

    //returns whether or not given id owns island
    islandOwnedById(player_id){
        return this.props.owner_id === player_id;
    }
    //returns player id that owns island
    getIslandOwnerId(){
        return this.props.owner_id;
    }

    //returns number of ports
    getNumberOfPorts(){
        return this.props.ports;
    }

    //returns number of ports available to dock
    hasPortsAvailable(){
        return this.props.number_ships_docked < this.props.ports;
    
    }

    //returns current amount of resources
    getCurrentResources(){
        return this.props.curr_resources;
    }

    //return remaining produciton
    getRemainingResources(){
        return this.props.remaining_resources;
    }

    //return number of ships on island
    getNumberOfShips(){
        return this.props.docked_ships_ids.length;
    }

    //return docked ship instances
    getShipsDocked(){
        return this.game_map.ships_by_id(this.props.docked_ships_ids)
    }
}