using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;

public class EndingGame : MonoBehaviour
{
    private float currentTime;
    private float startTime;
    public float GameEndingTime = 5;
    private int winner;
    void Start()
    {
        //get reference to the current time
        startTime = Time.time;
        //random number, 1 for player , 2 for opp
        winner = Random.Range(1,2);


    }

    // Update is called once per frame
    void Update()
    {
        //check current time
        currentTime = Time.time;
        //check for threshhold time 
        if((currentTime - startTime) >= GameEndingTime){
            //elapsed time has reached ending   
            Debug.Log("game ended");
            //freeeze the game
            Time.timeScale = 0;
            //send some stuff about who won
            PostData();
        }
    }
    void PostData() => StartCoroutine(PostData_Coroutine());
 
        IEnumerator PostData_Coroutine()
        {
            //route to post who won
            string uri = "localhost:3000/api/";
            WWWForm form = new WWWForm();
            form.AddField("title", winner);
            using(UnityWebRequest request = UnityWebRequest.Post(uri, form))
            {
                yield return request.SendWebRequest();
            }
        }
}