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
   
}
