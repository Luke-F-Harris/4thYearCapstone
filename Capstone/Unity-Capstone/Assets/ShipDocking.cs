using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Pathfinding;

public class ShipDocking : MonoBehaviour
{
    public bool isDocked = false;
    public bool isNav = false;
    public GameObject currDestination;
    public float dist = 100f;

    public bool goalDock = false;
    public bool isAttack = true;

    //this variable tells us min distance from target for navigation 
    public float minDistToStop = 1.3f;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

        //check if ship is navigating somwhere
        if (isNav)
        {

            //check if we reached min distance to stop nav
            dist = Mathf.Abs(Vector3.Distance(currDestination.transform.position, this.transform.position));
            //stop navigating and set target to null
            if (dist <= minDistToStop)
            {
                isNav = false;
                this.GetComponent<AIDestinationSetter>().target = this.transform;
            }
        }

    }
}