using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StartGame : MonoBehaviour
{
    public int shipsToSpawn;
    public GameObject startingPlayerPos;
    public GameObject startingOppPos;
    public GameObject playerShip;
    public GameObject oppShip;
     
    // Start is called before the first frame update
    void Start()
    {
        for (int i = 0, j = 2; i < shipsToSpawn; i++, j -= 4) {
            Vector3 pos1 = new Vector3(startingPlayerPos.transform.position.x, startingPlayerPos.transform.position.y +j, startingPlayerPos.transform.position.z );
            Instantiate(playerShip, pos1, startingPlayerPos.transform.rotation);
        }
        for (int i = 0, j = 2; i < shipsToSpawn; i++,j -= 4) {
            Vector3 pos2 = new Vector3(startingOppPos.transform.position.x, startingOppPos.transform.position.y +j, startingOppPos.transform.position.z );            
            Instantiate(oppShip, pos2, startingOppPos.transform.rotation);
        }
    }
}
