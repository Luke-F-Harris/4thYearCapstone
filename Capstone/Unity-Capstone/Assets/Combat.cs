using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Combat : MonoBehaviour
{
    public float damagePer = 10;
    public float coolDown = 1;
    public bool inCooldown = false;
    private float timeOfWeapon;
    private float currentTime;
    private bool isAttack=true;

    void Update()
    {   
        //set attack boolean
        isAttack=this.transform.parent.gameObject.GetComponent<ShipDocking>().isAttack;

        currentTime = Time.time;
        if((currentTime - timeOfWeapon) >= coolDown){
            //not in cooldown anymore
            inCooldown = false;
        }
        
    }
    private void OnTriggerStay2D(Collider2D other) {
        //check if it is another player or opp to do damage
        if(( other.transform.parent != null && other.transform.parent.CompareTag("OppShip") )&& this.gameObject.transform.parent.tag == "PlayerShip" ){

            //in the range or if isnt in attackmode
            if(inCooldown || !isAttack){

                //dont do more damage 
                
            }else{
                
                //no cool down and can damage
                other.gameObject.GetComponentInParent<PlayerStats>().health = other.gameObject.GetComponentInParent<PlayerStats>().health - damagePer;
                inCooldown = true;
                timeOfWeapon= Time.time;
            }

        }
        else if((other.transform.parent != null && other.transform.parent.CompareTag("PlayerShip") )&& this.gameObject.transform.parent.tag == "OppShip" ){
            //in the range
            if(inCooldown || !isAttack){

                //dont do more damage 
                
            }else{
                
                //no cool down and can damage
                other.gameObject.GetComponentInParent<PlayerStats>().health = other.gameObject.GetComponentInParent<PlayerStats>().health - damagePer;
                inCooldown = true;
                timeOfWeapon= Time.time;
            }

        }

    }
}