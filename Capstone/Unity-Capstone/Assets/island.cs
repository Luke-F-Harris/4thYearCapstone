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
       //check for docked ships to update number of docked ships vars
   }
    
        //if ship enters island
    void OnTriggerEnter2D(Collider2D col)
    {
        //check for ship collision and enough spots to dock
        if (col.gameObject.tag == "PlayerShip" || col.gameObject.tag == "OppShip" && numShips<numberOfPorts)
        {
            numShips += 1;
            resourceGain += 10f;
            //variable to keep track if ship is docked
            col.gameObject.GetComponent<ShipDocking>().isDocked = true;
            Debug.Log(col.gameObject.GetComponent<ShipDocking>().isDocked);
            Debug.Log("ship docked successfully");
        }
    }

    void OnTriggerExit2D(Collider2D col)
    {
        
        if ((col.gameObject.tag == "PlayerShip" || col.gameObject.tag == "OppShip") && col.gameObject.GetComponent<ShipDocking>().isDocked)
        {
            numShips -= 1;
            resourceGain -= 10f;
            col.gameObject.GetComponent<ShipDocking>().isDocked = false;
            Debug.Log("ship undocked successfully");
        }
    }
   
}
