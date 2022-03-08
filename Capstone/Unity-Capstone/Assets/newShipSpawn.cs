using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class newShipSpawn : MonoBehaviour
{

    //boolean to store if is island is claimed by the player or Opp
    
    private bool isClaimedByPlayer;
    private bool isClaimedByOpp;
    private int numShips;
    private int numberOfPorts;

    //references to the ships that we want to create and the transform of the island
    public GameObject OppShip;
    public GameObject PlayerShip;
    public Transform islandLocation;
    public GameObject PlayerShipRef;
    public GameObject OppShipRef;
    public GameObject GameManager;
    



    //variables to store info about resources
    
    //how many resources have been gained so far
    public float gainedResources;
    
    //how many ports are left
    //private int portsLeft= 3;

    //increases with how many docked ships
    public float gainedWith1Ship = 1;
    public float gainedWith2Ships = 2;
    public float gainedWith3Ships= 3;
    public float gainedWith4Ships =4;

    //how many resources are required for a spawning of new ship
    public float spawnThreshHold = 500;
    public float spawnVerticalOffset = 5;
    public float spawnHorizontalOffset = 0;
    //private island islandRef;



    private void Start()
    {
        islandLocation = this.gameObject.GetComponent<Transform>();
        //maybe a reference to the game manager to find what islands are owned
        isClaimedByPlayer = this.gameObject.GetComponent<island>().ownedByPlayer;
        isClaimedByOpp = this.gameObject.GetComponent<island>().ownedByOpp;
        numShips = this.gameObject.GetComponent<island>().numShips;
        numberOfPorts = this.gameObject.GetComponent<island>().numberOfPorts;
        

    }
    private void LateUpdate(){
        //update the variables
        isClaimedByPlayer = this.GetComponent<island>().ownedByPlayer;
        isClaimedByOpp = this.gameObject.GetComponent<island>().ownedByOpp;
        numShips = this.gameObject.GetComponent<island>().numShips;
        numberOfPorts = this.gameObject.GetComponent<island>().numberOfPorts;
        //late update the resources of the player or opp
        //this is so if a player has destoyed the islands ships the gain wont happen until the end
        if(isClaimedByPlayer){
            //island is claimed by player and can gain resources
            //check how many are docked to know how much to add
            AddResources(true);


        }else if (isClaimedByOpp){
            //island is claimed by Opp and can gain resourses
            AddResources(false);


        }else{
            
            //island is not owned do nothing

        }
    }
    private void AddResources(bool forPlayer){
        //will be true if for the player and false for the opp
        if((numberOfPorts - numShips) == 3){
            //1 docked ship
            gainedResources = gainedResources + gainedWith1Ship;
        }
        else if((numberOfPorts - numShips) == 2){
                //2 docked ship
                gainedResources = gainedResources + gainedWith2Ships;
        }else if((numberOfPorts - numShips) == 1){
                //3 docked ships
                gainedResources = gainedResources + gainedWith3Ships;
        }else if((numberOfPorts - numShips) == 0){
                //max docked ships of 4
                gainedResources = gainedResources + gainedWith4Ships;
                
        }
        //check if player now has enough to spawn a new ship
        if(gainedResources >= spawnThreshHold){
            //has enough resources to spawn
            //check who owns island for what ship to spawn
            if(isClaimedByPlayer == true){
                //claimed by player so spawn player ship
                SpawnShip(true);
                gainedResources = 0;
            }else{
                //claimed by opp so spawn opp ship
                SpawnShip(false);
                gainedResources = 0;
            }

        }
        
    }
    private void SpawnShip(bool playerShip){
        //bool keeps track of who is going to spawn, true is player ship and false is opp
        //Instantiate a player ship now that enough resources are gained
        //check where to spawn the ship by looking at the transform
        //units above the island
        Vector2 newPos = new Vector2(spawnHorizontalOffset,spawnVerticalOffset);
        //current location of the island
        Vector2 oldPos = new Vector2(islandLocation.position.x,islandLocation.position.y);
        newPos = newPos + oldPos;
        //make a potation for the 
        Quaternion rot = new Quaternion(0,0,0,0);
        if(isClaimedByPlayer){
            //spawn player ship and add it to the list
            PlayerShipRef = Instantiate(PlayerShip,newPos,rot);
            GameManager.GetComponent<GameManager>().PlayerShipList.Add(PlayerShipRef);
        }else{
            //spawn opp ship and add it to the list
            OppShipRef = Instantiate(OppShip,newPos,rot);
             GameManager.GetComponent<GameManager>().OppShipList.Add(OppShipRef);
        }
    }
}
