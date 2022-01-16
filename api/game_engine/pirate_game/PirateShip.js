const Geometry = require('./Geometry');
const Entity = require('./Entity');
const StaticConstants = require('./StaticConstants');
const DockingStatus = require('./DockingStatus');

class PirateShip extends Entity {
    constructor(gameMap, shipOwnerId, params) {
        super(params);
        this.gameMap = gameMap;
        this.shipOwnerId = shipOwnerId;

        this.params = {
            health: StaticConstants.PIRATE_SHIP_HEALTH,
            dockingStatus: DockingStatus.UNDOCKED,
            ...params
        };

    }

    isShipDocked() {
        return this.params.dockingStatus === DockingStatus.DOCKED;
    }

    isShipDocking() {
        return this.params.dockingStatus === DockingStatus.DOCKING;
    }

    isShipUndocking() {
        return this.params.dockingStatus === DockingStatus.UNDOCKING;
    }

    isShipUndocked() {
        return this.params.dockingStatus === DockingStatus.UNDOCKED;
    }

    canShipDock(island) {
        const island_distance = Geometry.distance(this, island);
        const ship_distance = StaticConstants.PIRATE_SHIP_DOCK_RADIUS + StaticConstants.ship_radius + island.radius;
        const is_island_free = island.hasSpaceForShips();
        const is_island_owned_by_me = island.ownerId == this.shipOwnerId;
        const is_island_unowned = island.isIslandOwned() == false;

        return island_distance <= ship_distance && is_island_free && (is_island_unowned || is_island_owned_by_me);
    }

    getOwnerId() {
        return this.shipOwnerId;
    }

    getDockingStatus() {
        return this.params.dockingStatus;
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
        return Geometry.encloseEndpoint(this, target_point, d);
    }

    // For logging:
    dock(island) {
        retiurn`docking ${this.id} ${island.id}`;
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
                target: Geometry.rotateEnd(this, target, angularStep),
                keepDistanceToTarget,
                speed: speed,
                avoidObstacles,
                maxCorrections: maxCorrections - 1,
                angularStep, ignoreShips, ignoreIslands
            })
        }
        const closeToTarget = Geometry.reduceEnd(this, target, keepDistanceToTarget);
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