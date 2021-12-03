import { Component, OnInit } from '@angular/core';
import {UserData} from '../../Interfaces/UserData'
import { BackEndRoutesService } from 'src/app/back-end-routes.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit {

  constructor(public BEservice: BackEndRoutesService) { }


  // temp user data
  user_data : UserData = {
    username: "Bob",
    prefered_language: "C++",
    rank: 1,
    uploads:20,
    games_played:1041,
    image_url: "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/7GBCHQUCEROJDPEVYQW7XG7VAE.jpg",
    highest_rank_achieved:1,
    games: [
      {game_id: 192, game_link: "game/gameid?='192'",
        game_date:"2017-01-01 09:03", game_data:{winner:"Carter", loser:"Bob", game_length:200},
        game_players: ["Carter", "Bob"]
      },
      {game_id: 411, game_link: "game/gameid?='411'",
        game_date:"2017-01-01 09:02", game_data:{winner:"Bob", loser:"Dylan", game_length:200},
        game_players: ["Dylan", "Bob"]
      },
      {game_id: 111, game_link: "game/gameid?='111'",
        game_date:"2017-01-01 01:32", game_data:{winner:"Bob", loser:"Alex", game_length:200},
        game_players: ["Alex", "Bob"]
      }
    ]
    }





  ngOnInit(): void {
    // when page loads it loads the user data in, find a cleaner way?
    //this.user_data = this.getUserData("1"); // "1" will be user id
  }

  // retrieves user data
  getUserData(id:string) {
    //this.user_data = this.BEservice.getMethod(id)
  }

}
