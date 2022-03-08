using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class island : MonoBehaviour
{
   //create some values for the island
   public float resourceGain;
   public float resourcesRemaining = 100;
   public float currentResources = 100;
   public int numShips = 0;
   public int numberOfPorts = 4;
   public bool hasPortsAvailable = true;
   public bool ownedByPlayer = false;
   public bool ownedByOpp = false;
   public static island land;
   
   private void Start() {
        ownedByPlayer = false;
        ownedByOpp = false;
   }
   void Update() {
       //always check for ships 
   }
    
        //if ship enters island
    void OnCollisionEnter2D(Collision2D col)
    {   
        //check for ship collision and enough spots to dock
        if (col.gameObject.tag == "PlayerShip" && !ownedByOpp)
        {
            ownedByPlayer=true;
            numShips += 1;
            //variable to keep track if ship is docked
            col.gameObject.GetComponent<ShipDocking>().isDocked = true;
        }

        if (col.gameObject.tag == "OppShip" && !ownedByPlayer)
        {
            ownedByOpp=true;
            numShips += 1;
            //variable to keep track if ship is docked
            col.gameObject.GetComponent<ShipDocking>().isDocked = true;
        }
    }

    void OnCollisionExit2D(Collision2D col)
    {
        
        if ((col.gameObject.tag == "PlayerShip" || col.gameObject.tag == "OppShip" && col.gameObject.GetComponent<ShipDocking>().isDocked))
        {   
            numShips -= 1;
            resourceGain -= 10f;
            col.gameObject.GetComponent<ShipDocking>().isDocked = false;
           
            //if no ships left no owners
            if(numShips==0){
            ownedByPlayer=false;
            ownedByOpp=false;
            }
        }
    }
}