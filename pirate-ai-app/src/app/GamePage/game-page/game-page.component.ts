import { Component, OnInit } from '@angular/core';
import { GameData } from "../../Interfaces/GameData";
import { NgModule } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

// How to add auth?



@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})


export class GamePageComponent implements OnInit {
  pause = false;
  play = true;
  slider_value = 0;
  val = 2;
  selectedCode: Code;
  selectedCodeName = "";
  uploadCodeName: string;
  vid = <HTMLVideoElement>document.getElementById("myVideo");
  color: ThemePalette = 'primary';
  replayName = "https://www.angulartraining.com/Cybertruck.mp4";
  otherGames = [
    { "winner": "henry123", "loser": "donte129", "video": "https://www.angulartraining.com/Cybertruck.mp4" },
    { "winner": "henry123", "loser": "dad12", "video": "https://tesla-cdn.thron.com/static/A7I6LP_lane_change_0.mp4-2000_PYSUF4.mp4" },
    { "winner": "Pen_ISLAND", "loser": "henry123" },
    { "winner": "henry123", "loser": "MudRoomMan" }

  ];
  bots = [
    { "name": "Beginner", },
    { "name": "Intermediate" },
    { "name": "Advanced" },
    { "name": "Expert" }
  ];


  fileName = '';
  selectedBot = "Beginner";
  uploaded_bot: string;
  upload_bot_form: FormData;
  get_url = "/api/codes/all"; // For testing we just default to being user with id 1? Makes a lot of stuff useless...
  create_code_url = "/api/codes/create";
  start_game_url = "/api/games/start";
  codes: Code[];

  game_data: GameData =
    { game_id: 120, game_link: 'game/?game_id=120', game_date: "Nov 23rd, 22 - 16:56:17", game_data: { winner: "henry123", loser: "donte129", game_length: 120 }, game_players: ["henry123", "donte129"] }

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
        console.log(file_text);
        // Get the file name
        const file_name = file.name;

        this.uploaded_bot = file_text;
      };




    }
  }
  startGame() {
    let base_url = environment.wsBaseURL;
    const url = base_url + this.start_game_url;
    console.log(this.selectedBot)
    this.http.post(url, {
      "creator_id": 1,
      "code_id": this.selectedCode.id,
      "level": this.selectedBot
    }).subscribe(data => {
      console.log(data);
    });
  }


  getGameData() {
    // Outcome
  }
  getGames() {
    // Access env
    let base_url = environment.wsBaseURL;
    const url = base_url + this.get_url;
    this.http.get(url).subscribe(data => {
      console.log(data);
      // Iterate over the data and create a new array of objects
      this.codes = data as Code[];



    }
    );

  }
  uploadBot(): void {
    // Sent the file and the name to the server, use a default id of 1 for now
    let base_url = environment.wsBaseURL;
    const url = base_url + this.create_code_url;

    const data = {
      name: this.uploadCodeName,
      code: this.uploaded_bot,
      creator_id: 1,
    };

    this.http.post(url, data).subscribe(data => {
      console.log(data);
      this.getGames();
    });
  }

  ngOnInit(): void {
    this.getGames();
  }
  selectBot(bot: string) {
    this.selectedBot = bot;
  }
  selectCode(code: Code) {
    this.selectedCode = code;
    this.selectedCodeName = code.name;
  }


  skip_previous() {
    this.sliderEvent(0);
  }

  skip_next() {
    this.sliderEvent(this.game_data.game_data.game_length);
  }
  sliderEvent(event: any) {
    this.slider_value = event.value;
  }
  changePause() {

    this.pause = !this.pause;
    this.play = !this.play;
  }
  selectReplay(NameTime: string) { //WIP in switching videos
    this.replayName = NameTime;
  }
  // Query the api for code data:



}
export class Code {
  id: number;
  creator_id: number;
  created_at: string;
  code: string;
  name: string;
}

