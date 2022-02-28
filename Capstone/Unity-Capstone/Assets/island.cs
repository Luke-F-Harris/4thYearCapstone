using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class island : MonoBehaviour
{
   //create some values for the island
   public float resourceGain;
   public float resourcesRemaining = 100;
   public float currentResources = 100;
   private int numShips = 0;
   public int numberOfPorts = 4;
   private bool hasPortsAvailable = true;
   private bool ownedByPlayer = false;
   private bool ownedByOpp = false;
   
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
            resourceGain += 10f;
            //variable to keep track if ship is docked
            col.gameObject.GetComponent<ShipDocking>().isDocked = true;
            Debug.Log(col.gameObject.GetComponent<ShipDocking>().isDocked);
            Debug.Log("player ship docked successfully");
        }

        if (col.gameObject.tag == "OppShip" && !ownedByPlayer)
        {
            ownedByOpp=true;
            numShips += 1;
            resourceGain += 10f;
            //variable to keep track if ship is docked
            col.gameObject.GetComponent<ShipDocking>().isDocked = true;
            Debug.Log(col.gameObject.GetComponent<ShipDocking>().isDocked);
            Debug.Log("Opp ship docked successfully");
        }


    }

    void OnCollisionExit2D(Collision2D col)
    {
        Debug.Log("entereted");
        if ((col.gameObject.tag == "PlayerShip" || col.gameObject.tag == "OppShip" && col.gameObject.GetComponent<ShipDocking>().isDocked))
        {   
            numShips -= 1;
            resourceGain -= 10f;
            col.gameObject.GetComponent<ShipDocking>().isDocked = false;
            Debug.Log("ship undocked successfully");
            
            //if no ships left no owners
            if(numShips==0){
            ownedByPlayer=false;
            ownedByOpp=false;
            Debug.Log("Island has no owners");
            }

        }
    }
   
}
