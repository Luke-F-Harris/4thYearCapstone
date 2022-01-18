const Geo = require('./Geo');
const Ent = require('./Ent');
const StaticConstants = require('./StaticConstants');
const DS = require('./DockingStatus');

class PirateShip extends Entity {
    constructor(game_map, ship_owner_id, params) {
        super(params);
        this._game_map = game_map;
        this._ship_owner_id = ship_owner_id;

        this.params = {
            health: StaticConstants.base_ship_health,
            docking_status: DS.undocked,
            ...params
        };

    }

    isShipDocked() {
        return this.params.docking_status === DS.docked;
    }

    isShipDocking() {
        return this.params.docking_status === DS.docking;
    }

    isShipUndocking() {
        return this.params.docking_status === DS.undocking;
    }

    isShipUndocked() {
        return this.params.docking_status === DS.undocked;
    }

    canShipDock(island) {
        const island_distance = Geo.distance(this, island);
        const ship_distance = StaticConstants.dock_radius + StaticConstants.ship_radius + island.radius;
        const is_island_free = island.hasSpaceForShips();
        const is_island_owned_by_me = island.ownerId == this._ship_owner_id;
        const is_island_unowned = island.isIslandOwned() == false;

        return island_distance <= ship_distance && is_island_free && (is_island_unowned || is_island_owned_by_me);
    }

    getOwnerId() {
        return this._ship_owner_id;
    }

    getDockingStatus() {
        return this.params.docking_status;
    }

    getRadius() {
        return StaticConstants.ship_radius;
    }

    getDockingIsland() {
        return this.params.dockingIsland;
    }

    getDockingProgress() {
        return this.params.dockingProgress;
    }

    getWeaponCooldown() {
        return this.params.weaponCooldown;
    }

    approaching(target_point, d) {
        return Geo.encloseEndpoint(this, target_point, d);
    }

    // For logging:
    dock(island) {
        retiurn `docking ${this.id} ${island.id}`;
    }

    unDock() {
        return `undocking ${this.id}`;
    }
    thrust(speed, angle) {
        return `thrust ${this.id} ${speed | 0} ${angle | 0}`;
    }

    navigate(target, keep_distance = 0, speed, avoid_obstacles = true, max_corrections = 90, angular_step = 1, ignore_ships = false, ignore_islands = false) {
        if (max_corrections <= 0) {
            return null;
        }

        if (obstacles.length) {
            return this.navigate({
                target: Geo.rotateEnd(this, target, angularStep),
                keepDistanceToTarget,
                speed: speed,
                avoidObstacles,
                maxCorrections: maxCorrections - 1,
                angularStep,
                ignoreShips,
                ignoreIslands
            })
        }
        const closeToTarget = Geo.reduceEnd(this, target, keepDistanceToTarget);
        const distance = this.distanceBetween(closeToTarget);
        const angleDegree = this.angleBetweenInDegree(closeToTarget);

        const newSpeed = distance >= speed ? speed : distance;
        return this.thrust(newSpeed, angleDegree);
    }
    toString() {
        return 'ship. owner id: ' + this.ownerId + ': ' + JSON.stringify(this._params);
    }

}

module.exports = PirateShip;