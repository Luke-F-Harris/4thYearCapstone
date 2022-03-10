using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Text;

using UnityEngine.SceneManagement;
using UnityEngine.Networking;

public class GameEnding : MonoBehaviour
{
    private float currentTime;
    private float startTime;
    public float GameEndingTime = 60;
    private string winner;
    void Start()
    {
        //get reference to the current time
        startTime = Time.time;
    }

    // Update is called once per frame
    void Update()
    {
        //check current time
        currentTime = Time.time;

        List<GameObject> players = new List<GameObject>(GameObject.FindGameObjectsWithTag("PlayerShip"));
        List<GameObject> opps = new List<GameObject>(GameObject.FindGameObjectsWithTag("OppShip"));

        if (players.Count == 0)
        {
            winner = "2";
            Time.timeScale = 0;
            PostData();
            this.enabled = false;
        }

        if (opps.Count == 0)
        {
            winner = "1";
            Time.timeScale = 0;
            PostData();
            this.enabled = false;

        }


        //check for threshhold time 
        if ((currentTime - startTime) >= GameEndingTime)
        {
            //elapsed time has reached ending   
            Debug.Log("game ended");

            if (opps.Count >= players.Count)
            {
                winner = "2";
            }
            else
            {
                winner = "1";
            }
            //freeeze the game
            Time.timeScale = 0;
            //send some stuff about who won
            PostData();
            this.enabled = false;
        }

    }
    void PostData() => StartCoroutine(PostData_Coroutine());

    public IEnumerator PostData_Coroutine()
    {

        WinningObject word = new WinningObject();
        word.w = winner;
        var jsonData = JsonUtility.ToJson(word);
        using (UnityWebRequest www = UnityWebRequest.Post("http://localhost:3000/api/games/finished", jsonData))
        {
            www.SetRequestHeader("content-type", "application/json");
            // www.SetRequestHeader("Access-Control-Allow-Origin", "*");
            www.uploadHandler.contentType = "application/json";
            www.uploadHandler = new UploadHandlerRaw(System.Text.Encoding.UTF8.GetBytes(jsonData));

            yield return www.SendWebRequest();
        }
    }
    // public IEnumerator PostData_Coroutine()
    // {
    //     WinningObject word = new WinningObject(winner);

    //     using (UnityWebRequest request =
    //         UnityWebRequest.Post("localhost:3000/api/games/finished", JsonUtility.ToJson(word)))
    //     {
    //         request.SetRequestHeader("Content-Type", "application/json");
    //         yield return request.SendWebRequest();

    //         if (request.isHttpError || request.isNetworkError)
    //         {
    //             Debug.LogError(request.error);
    //         }
    //         else
    //         {
    //             Debug.Log(request.downloadHandler.text);
    //         }
    //     }
    // }
}

public class WinningObject
{
    public string w;
}
public static class JsonHelper
{
    public static List<T> FromJson<T>(string json)
    {
        Wrapper<T> wrapper = JsonUtility.FromJson<Wrapper<T>>(json);
        return wrapper.result;
    }

    [System.Serializable]
    private class Wrapper<T>
    {
        public List<T> result;
    }
}