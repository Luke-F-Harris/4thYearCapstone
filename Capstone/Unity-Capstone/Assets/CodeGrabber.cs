using System.Collections;
using UnityEngine;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
public class CodeGrabber : MonoBehaviour
{
    public GameObject playerBotController;

    void Start()
    {



        playerBotController.AddComponent<code_1>();
        // playerBotController.AddComponent(t);


        //Needs to be class naming conventions to ensure Code Grabber picks it up, also code uploaded needs to be of format
        /*using System.Collections;
        using System.Collections.Generic;
        using UnityEngine;

        public class code_1 : MonoBehaviour //make sure to rename code_1 to whatever class/file name is
        {
            // Start is called before the first frame update
            void Start()
            {
                Debug.Log("Script Grabber is Working!");
            }

            // Update is called once per frame
            void Update()
            {
        
            }
        }
        */

    }


    void Update()
    {

    }
}
