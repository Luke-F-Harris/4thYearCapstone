using System.Collections;
using System.Collections.Generic;

using System.Linq;

using UnityEngine;

public class TempScript : MonoBehaviour
{
    public Game game;
    void Start()
    {
        game = GameObject.Find("GameScriptObject").GetComponent<Game>();
    }
    // Update is called once per frame
    void Update()
    {

        List<GameObject> my_ships = game.getPlayerShips();
        List<GameObject> enemy_ships = game.getEnemyShips();

        // list of already planned to go to dock islands
        List<GameObject> planned_islands = new List<GameObject>();

        // list of specificed ships for attacking
        List<GameObject> my_attack_ships = new List<GameObject>();
        // list of specificed ships for docking        
        List<GameObject> my_dock_ships = new List<GameObject>();

        // for each ship that i controll
        foreach (GameObject ship in my_ships)
        {

            // if ship is already docked, just skip this ship in the forloop
            if (game.isDocked(ship))
            {
                continue;
            }
            var available_islands = from island in game.getAllIslands() where !game.isOwned(island) select island;


            // sorted list of closest entities to specified ship;
            var entities_by_distance = game.getEntitiesByDistance(ship);

            var closest_enemy_ships = from ent in entities_by_distance where ((game.getTagOfGO(ent) == "ship") && !(my_ships.Contains(ent))) select ent;
            var closest_empty_islands = from ent in entities_by_distance where ((game.getTagOfGO(ent) == "island") && !game.isOwned(ent)) select ent;

            if (available_islands.Count() > 0)
            {
                foreach (GameObject island in closest_empty_islands)
                {
                    if (game.isOwned(island))
                    {
                        continue;
                    }

                    if (game.canDock(ship, island) && !(planned_islands.Contains(island)))
                    {
                        game.navigateShipToDock(ship, island);
                        planned_islands.Insert(0, island);
                    }
                    else
                    {
                        // if the island is already being progressed to
                        if (planned_islands.Contains(island))
                        {
                            continue;
                        }
                        game.navigateShip(ship, island);
                    }
                    break;

                    // if (game.canDock(ship, island) && !(planned_islands.Contains(island)))
                    // {
                    //     game.navigateShipToDock(ship, island);
                    //     planned_islands.Add(island);
                    // }
                    // else
                    // {
                    //     if (planned_islands.Contains(island))
                    //     {
                    //         continue;
                    //     }
                    //     game.navigateShip(ship, island);

                    // }

                    // game.navigateShip(ship, island);
                }
            }
            else if (closest_enemy_ships.Count() > 0)
            {
                GameObject target_ship = closest_enemy_ships.ToList()[0];
                game.setAttackMode(ship, true);
                game.navigateShip(ship, target_ship);
            }
        }

    }
}
