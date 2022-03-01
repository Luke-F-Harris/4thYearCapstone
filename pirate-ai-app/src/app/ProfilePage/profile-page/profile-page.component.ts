import { Component, OnInit } from '@angular/core';
import { UserData } from '../../Interfaces/UserData'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit {

  uploaded_bot: string;
  create_code_url = "/api/codes/create";
  uploadCodeName: string;
  fileName = '';
  user_stored_data = JSON.parse(sessionStorage.getItem('auth-user'));

  constructor(private http: HttpClient) { }

  onFileSelected(event: Event) {

    const file = (event.target as HTMLInputElement).files[0];
    // const file: File = event.target.files[0];

    if (file) {
      // Get the file data
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Extract the file data and convert to string
        const file_data = reader.result.toString();
        // Devode base64 string to text
        const file_text = atob(file_data.split(',')[1]);
        // Get the file name
        this.fileName = file.name;

        this.uploaded_bot = file_text;
      };
    }
  }
  uploadBot(): void {
    // Sent the file and the name to the server, use a default id of 1 for now
    let base_url = environment.wsBaseURL;
    const url = base_url + this.create_code_url;

    const data = {
      name: this.uploadCodeName,
      code: this.uploaded_bot,
      creator_id: this.user_stored_data.id,
    };

    this.http.post(url, data).subscribe(data => {
      console.log(data);
    });
  }
  // temp user data
  user_data: UserData = {
    username: "Bob",
    prefered_language: "C++",
    rank: 1,
    uploads: 20,
    games_played: 1041,
    image_url: "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/7GBCHQUCEROJDPEVYQW7XG7VAE.jpg",
    highest_rank_achieved: 1,
    games: [
      {
        game_id: 192, game_link: "game/gameid?='192'",
        game_date: "2017-01-01 09:03", game_data: { winner: "Carter", loser: "Bob", game_length: 200 },
        game_players: ["Carter", "Bob"]
      },
      {
        game_id: 411, game_link: "game/gameid?='411'",
        game_date: "2017-01-01 09:02", game_data: { winner: "Bob", loser: "Dylan", game_length: 200 },
        game_players: ["Dylan", "Bob"]
      },
      {
        game_id: 111, game_link: "game/gameid?='111'",
        game_date: "2017-01-01 01:32", game_data: { winner: "Bob", loser: "Alex", game_length: 200 },
        game_players: ["Alex", "Bob"]
      }
    ]
  }





  ngOnInit(): void {
    // when page loads it loads the user data in, find a cleaner way?
    //this.user_data = this.getUserData("1"); // "1" will be user id
  }

  // retrieves user data
  getUserData(id: string) {
    //this.user_data = this.BEservice.getMethod(id)
  }

}
