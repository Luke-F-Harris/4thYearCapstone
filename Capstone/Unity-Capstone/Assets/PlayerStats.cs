using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerStats : MonoBehaviour
{
   public float health = 100;


   private void Update() {
      if(health <= 0){
         //this.gameObject.SetActive(false);
         Destroy(this.gameObject);
      }
   }
   
}
