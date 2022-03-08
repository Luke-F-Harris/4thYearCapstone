using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MapGeneration : MonoBehaviour
{
    //spawn the islands
    private GameObject islandRef;
    public GameObject islandPreFab;
    public GameObject gmref;
    public GameObject pathFinderObject;
    private List<Vector2> islandsLocations = new List<Vector2>();
    public float islandRadius = 3;
    private GameObject player;

    private Vector2 genPosition;
    public int playerIslandSpawnRadius= 1;
    public float xRange1 = -10;
    public float xRange2 = -20;
    public float yRange1 = -5;
    public float yRange2 = 5;
    public int numIslands1 = 4;
    public int numIslands2 = 7;
    
    void Start()
    {
       
        var numberOfIslands = Random.Range(numIslands1,numIslands2);
        //make a random number of islands for one side
        for(int i = 0; i < numberOfIslands;i++){
            //get the player location
            player = GameObject.FindGameObjectWithTag("PlayerShip");
            var playerPosx = player.transform.position.x;
            var playerPosy = player.transform.position.y;
            //combine into a new vector2
            Vector2 playerPos = new Vector2(playerPosx,playerPosy);
            // make a random point until it is out of the range of the player
            var count = 0;
            do{
            count++;
            if(count > 300){
                break;
            }
            //make generate some x value to spawn the island
            var xIsland = Random.Range(xRange1,xRange2);
            var yIsland = Random.Range(yRange1,yRange2);

            //make a random location for the y value
            genPosition = new Vector2(xIsland,yIsland);


            //need the pointinside to be false and islandoverlap to be false
            }while( PointInsideSphere(genPosition,playerPos,playerIslandSpawnRadius) || islandOverLap(genPosition)); // checking if in the range of the player
            //add to the list of islands
            islandsLocations.Add(genPosition);
            //make the island
            islandRef = Instantiate(islandPreFab,genPosition, Quaternion.identity) as GameObject;
            //add to the list 
            gmref.GetComponent<GameManager>().IslandList.Add(islandRef);
        
        }
        //mirror for the other side by flipping the values
        foreach(Vector2 value in islandsLocations){
            //invert the x value
            Vector2 newpos = new Vector2(-value.x,value.y);
            //make the new islands
            islandRef = Instantiate(islandPreFab,newpos, Quaternion.identity) as GameObject;
            gmref.GetComponent<GameManager>().IslandList.Add(islandRef);
        }
        Instantiate(pathFinderObject);

    }
    //function to check if point is side of a circle for generating islands near the players
    public bool PointInsideSphere(Vector2 point, Vector2 center, float radius) {
        //if the player is in the radius
        var Pointflag = false;
        if(Vector3.Distance(point, center) < radius){
            Pointflag = true;
        }
        else{}
        return Pointflag;
    }
    //make function so islands do not overlap
    public bool islandOverLap(Vector2 newIsland){
        //make a flag value
        var Islandflag = false;

        //check if there is an overlap
        foreach(Vector2 value in islandsLocations){
            //check if it is in the radius
            if(PointInsideSphere(newIsland,value,islandRadius) == true){
                //make the flag false
                Islandflag = true;
                
            }
            else{

            }
        }
        //return the flag
        return Islandflag;
    }
}