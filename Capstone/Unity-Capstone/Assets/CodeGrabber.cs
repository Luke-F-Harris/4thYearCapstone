using System.Collections;
using UnityEngine;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
public class CodeGrabber : MonoBehaviour
{
    public GameObject test;

    void Start()
    {
        DirectoryInfo dir = new DirectoryInfo(Application.dataPath + "/Uploads/");
        FileInfo[] info = dir.GetFiles(".");
        string name_of_file = info[0].Name;
        Type type = Type.GetType(name_of_file);
        test.AddComponent(type);
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
