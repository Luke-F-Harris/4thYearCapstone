using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Pathfinding;
using System.Linq;

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
    public List<GameObject> getEnemyShips()
    {
        return new List<GameObject>(GameObject.FindGameObjectsWithTag("OppShip"));
    }

    //return list of all islands
    public List<GameObject> getAllIslands()
    {
        return new List<GameObject>(GameObject.FindGameObjectsWithTag("island"));
    }
    // return list of all game objects
    public List<GameObject> getAllShips()
    {
        List<GameObject> result = new List<GameObject>();

        foreach (GameObject i in getPlayerShips())
        {
            result.Add(i);
        }
        foreach (GameObject i in getEnemyShips())
        {
            result.Add(i);
        }
        return result;
    }
    public string getTagOfGO(GameObject target)
    {
        string value = target.tag;
        if (value.Contains("Ship"))
        {
            return "ship";
        }
        else if (value.Contains("island"))
        {
            return "island";
        }
        else
        {
            return "unknown";
        }
    }
    // return the calculated distance between two entities
    public double calculateDistanceBetween(GameObject reference, GameObject target)
    {

        float dist = Vector3.Distance(target.transform.position, reference.transform.position);
        return dist;
    }


    // return list of all entities
    public List<GameObject> getAllEntities()
    {
        List<GameObject> result = new List<GameObject>();
        foreach (GameObject i in getAllShips())
        {
            result.Add(i);
        }
        foreach (GameObject i in getAllIslands())
        {
            result.Add(i);
        }
        return result;
    }

    // return list of all entities by distance
    public List<GameObject> getEntitiesByDistance(GameObject reference)
    {

        // list of entites sorted by distance (closest -> farthest)
        List<GameObject> closest_entities = new List<GameObject>();

        // list of remaining entities (entity removed when it is the closest)
        List<GameObject> list_of_remaining_entities = getAllEntities();



        foreach (GameObject entity in list_of_remaining_entities.ToList())
        {
            // if entity is what were are trying to find distances from, skip
            if (entity == reference)
            {
                continue;
            }
            else
            {
                // index of the closest entity in remaining entities
                int index_of_smallest_val = int.MaxValue;
                double smallest_distance_of_entity = int.MinValue;
                foreach (GameObject e in list_of_remaining_entities.ToList())
                {
                    // continuously saves lowest value until all values are looked at
                    if (calculateDistanceBetween(e, reference) <= index_of_smallest_val)
                    {
                        index_of_smallest_val = list_of_remaining_entities.FindIndex(a => a == e);
                        smallest_distance_of_entity = calculateDistanceBetween(e, reference);
                    }
                }
                // adds the entity with the closest distance and then removes that item
                if (index_of_smallest_val == int.MaxValue || smallest_distance_of_entity == int.MinValue)
                {
                    break;
                }
                closest_entities.Add(list_of_remaining_entities[Mathf.RoundToInt(index_of_smallest_val)]);
                list_of_remaining_entities.RemoveAt(index_of_smallest_val);
            }
        }

        // foreach (GameObject entity in list_of_remaining_entities.ToList())
        // {
        //     closest_entities = closest_entities.OrderBy(x => x[1]);
        // }
        return closest_entities;
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
    public void navigateShipAttack(GameObject ship, GameObject target)
    {

        ship.GetComponent<ShipDocking>().isNav = false;
        ship.GetComponent<ShipDocking>().isAttack = true;
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


public class ObjDist
{
    public ObjDist(GameObject ent, double distr)
    {
        entity = ent;
        dist = distr;

    }
    public GameObject entity;
    public double dist;


}