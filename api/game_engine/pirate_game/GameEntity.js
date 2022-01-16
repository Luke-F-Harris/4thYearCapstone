const Geometry = require('./Geometry');

class Ent {
    constructor(params) {
        this._params = params;
    }
    get radius() {//gets this entity's radius
        return this._params.radius;
    }
    get y() {//gets this entity's y-coord
        return this._params.y;
    }
    get x() {//gets this entity's x-coord
        return this._params.x;
    }
    get health() {//gets this entity's health
        return this._params.health;
    }
    get id() {//gets this entity's id
        return this._params.id;
    }
    degreesBetween(target_point) {//degreesBetween function uses the degreeAngle function in the Geo class to find the angle between this entity and the target point in degrees
        return Geometry.degreeAngle(this, target_point);
    }
    distance(target_point) {//distance function uses the distanceBetween function in the Geo class to find the distance between this entity and the target point
        return Geometry.distanceBetween(this, target_point);
    }
}
module.exports = Ent;