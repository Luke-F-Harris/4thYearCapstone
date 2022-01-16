class Geo{
    static positionRotate(starting_point,end_point, degree_change){//positionRotate function changes angle of the line towards the end position
        const dist=Geo.distanceBetween(starting_point,end_point);//calls distanceBetween function for distance between
        const deg_angle=Geo.degreeAngle(starting_point,end_point);//calls degreeAngle function for angle between
        const new_degree=deg_angle+degree_change;
        const new_radian=Geo.radianAngle(new_degree);//calls radianAgnle function for angle between in radian
        const x_coord=Math.cos(new_radian)*dist;
        const y_coord=Math.sin(new_radian)*dist;
        return {x:starting_point.x+x_coord,y:starting_point.y+y_coord};

    }
    static segmentsIntersecting(starting_point,end_point,circ,test){//the segmentsIntersecting function preforms a test to see if a circle and a line segment are intersecting
        const x_distance=end_point.x-starting_point.x;//getting distance on x axis
        const y_distance=end_point.y-starting_point.y;//getting distance on y axis
        const area=x_distance**2+ y_distance ** 2;

        if(area===0.0){
            return Geo.distanceBetween(starting_point,end_point)<=(circ.radius+test);
        }
        const base=-2*(starting_point.x**2-starting_point.x*end_point.x-starting_point.x*circ.x+end_point.x*circ.x+starting_point.y**2-starting_point.y*end_point.y-starting_point.y*circ.y+end_point.y*circ.y);
        const tot=Math.min(-base/(2*area),1.0);
        if(tot<0){
            return false;
        }
        const x_close=starting_point.x+x_distance*tot;
        const y_close=starting_point.y+y_distance*tot;

        const dist_close=Geo.distanceBetween({x:x_close,y:y_close},circ);
        return dist_close<=circ.radius+test;//returns true if they intersect

    }
    static radianAngle(starting_point,end_point){//radianAngle function calculates the angle between two points in radians
        const x_distance=end_point.x-starting_point.x;//getting distance on x axis
        const y_distance=end_point.y-starting_point.y;//getting distance on y axis
        const arc_tangent=Math.atan2(x_distance,y_distance);//uses atan2 function to calculate the arc tangent between the two distances
        return arc_tangent >= 0 ? arc_tangent : (arc_tangent+2 *Math.PI);
    }
    static degreeAngle(starting_point,end_point){//degreeAngle function calculates the angle between two points in degrees
        return Geo.convertDegree(this.radianAngle(starting_point,end_point));//uses the radianAngle function and then converts it using the convertDegree function
    }
    static convertDegree(radian){//convertDegree function converts radians to degrees
        return radian * 180 / Math.PI;
    }
    static encloseEnd(starting_point,end_point,change){//encloseEnd function finds the point closest to the target
        const deg_radian=Geo.radianAngle(starting_point,end_point);//gets degree between points using radianAngle function
        const x_distance=Math.cos(deg_radian)*change;
        const y_distance=Math.sin(deg_radian)*change;
        return {x:end_point.x-x_distance,y:end_point.y-y_distance}
    }
    static convertRadian(deg){//convertRadian function converts degrees to radian
        return deg*Math.PI/180.0;
    }
    static distanceBetween(starting_point,end_point){//distanceBetween function calculates the distance between two points
        const x_distance=end_point.x-starting_point.x;//getting distance on x axis
        const y_distance=end_point.y-starting_point.y;//getting distance on y axis
        return Math.sqrt(Math.pow(x_distance,2)+Math.pow(y_distance,2));
    }
    
}
module.exports = Geo;