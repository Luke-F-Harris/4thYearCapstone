using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PirateAIBOT1 : MonoBehaviour
{
    public Game game;
    void Start()
    {

    }
    // Update is called once per frame
    void Update()
    {
        game = GameObject.Find("GameScriptObject").GetComponent<Game>();
        List<GameObject> my_ships = game.getEnemyShips();
        List<GameObject> enemy_ships = game.getPlayerShips();

        foreach (GameObject ship in my_ships)
        {
            if (game.isDocked(ship))
            {
                continue;
            }

            foreach (GameObject island in game.getAllIslands())
            {

                if (game.canDock(ship, island))
                {
                    game.navigateShipToDock(ship, island);
                }
                else
                {
                    continue;
                }
            }
        }

    }
}
