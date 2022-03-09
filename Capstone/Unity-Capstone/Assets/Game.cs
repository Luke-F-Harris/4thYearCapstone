using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Pathfinding;

public class Game : MonoBehaviour
{
    public static Game game;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    //returns list of player ships
    public List<GameObject> getPlayerShips()
    {
        return new List<GameObject>(GameObject.FindGameObjectsWithTag("PlayerShip"));
    }

    //return list of enemy ships
    public List<GameObject> getEnemeyShips()
    {
        return new List<GameObject>(GameObject.FindGameObjectsWithTag("OppShip"));
    }

    //return list of all islands
    public List<GameObject> getAllIslands()
    {
        return new List<GameObject>(GameObject.FindGameObjectsWithTag("island"));
    }

    //return list of player islands
    public List<GameObject> getAllPlayerIslands()
    {
        List<GameObject> allIslands = new List<GameObject>(GameObject.FindGameObjectsWithTag("island"));

        List<GameObject> playerIslands = new List<GameObject>();

        //filter islands that are owned by player;
        for (int i = 0; i < allIslands.Count; i++)
        {
            if (allIslands[i].GetComponent<island>().ownedByPlayer)
            {
                playerIslands.Add(allIslands[i]);
            }
        }
        return playerIslands;
    }

    //return list of player islands
    public List<GameObject> getAllOppIslands()
    {
        List<GameObject> allIslands = new List<GameObject>(GameObject.FindGameObjectsWithTag("island"));

        List<GameObject> oppIslands = new List<GameObject>();

        //filter islands that are owned by player;
        for (int i = 0; i < allIslands.Count; i++)
        {
            if (allIslands[i].GetComponent<island>().ownedByOpp)
            {
                oppIslands.Add(allIslands[i]);
            }
        }
        return oppIslands;
    }

    //returns if  island is owned by player
    public bool isIslandOwnedByPlayer(GameObject island)
    {

        return island.GetComponent<island>().ownedByPlayer;
    }

    //returns if ship can dock to island
    public bool canDock(GameObject ship, GameObject island)
    {
        var land = island.GetComponent<island>();
        return ((land.numberOfPorts > land.numShips) && ((ship.tag == "PlayerShip" && isIslandOwnedByPlayer(island)) || ((ship.tag == "OppShip" && isIslandOwnedByEnemy(island))) || (!isOwned(island))));
    }

    // returns if the ship is currently docked
    public bool isDocked(GameObject ship)
    {

        return ship.GetComponent<ShipDocking>().isDocked;
    }


    //returns if  island is owned by enemy
    public bool isIslandOwnedByEnemy(GameObject island)
    {
        return island.GetComponent<island>().ownedByOpp;
    }

    // returns if the island is owned by anyone
    public bool isOwned(GameObject island)
    {
        return island.GetComponent<island>().ownedByOpp || island.GetComponent<island>().ownedByPlayer;
    }

    //navigates ship towards target
    public void navigateShip(GameObject ship, GameObject target)
    {

        ship.GetComponent<ShipDocking>().isNav = true;

        //set the destination for the ship
        ship.GetComponent<ShipDocking>().currDestination = target;
        ship.GetComponent<AIDestinationSetter>().target = target.transform;
    }

    //navigate towards specific island to dock
    public void navigateShipToDock(GameObject ship, GameObject target)
    {


        ship.GetComponent<ShipDocking>().isNav = true;
        //set the goal for the ship to dock
        ship.GetComponent<ShipDocking>().goalDock = true;

        //set the destination for the ship to dock
        ship.GetComponent<ShipDocking>().currDestination = target;
        ship.GetComponent<AIDestinationSetter>().target = target.transform;
    }

    //set the attackMode for the ship
    public void setAttackMode(GameObject ship, bool attackMode)
    {
        ship.GetComponent<ShipDocking>().isAttack = attackMode;
    }
}
