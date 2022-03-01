import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  styleUrls: ['./playgame.component.scss']
})
export class PlaygameComponent implements OnInit {
  bots = [
    { "name": "Beginner", },
    { "name": "Intermediate" },
    { "name": "Advanced" },
    { "name": "Expert" }
  ];
  selectedBot = "Beginner";
  selectedCode: Code;
  selectedCodeName = "";
  selectedCodeCode: string;
  user_data = JSON.parse(sessionStorage.getItem('auth-user'));
  token = sessionStorage.getItem('auth-token');
  get_url = "/api/codes/get"; // For testing we just default to being user with id 1? Makes a lot of stuff useless...
  start_game_url = "/api/games/start";
  codes: Code[];

  constructor(private http: HttpClient) {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json');
    headers.append("authorization", this.token);
  }

  getGames() {
    // Access env
    let base_url = environment.wsBaseURL;
    const url = base_url + this.get_url;
    const headers = new HttpHeaders().append("authorization", this.token)
    const body = {
      "user_id": this.user_data.id
    }

    let params = new HttpParams({ fromObject: body });
    // Get the data from the server
    // Headers are needed for authorization


    this.http.get(url, { headers, params }).subscribe(data => {
      this.codes = data as Code[];
    });
  }
  startGame() {
    let base_url = environment.wsBaseURL;
    const url = base_url + this.start_game_url;
    const headers = new HttpHeaders().append("authorization", this.token)
    let body = {
      "creator_id": this.user_data.id,
      "code_id": this.selectedCode.id,
      "level": this.selectedBot,

    }
    // Post the data to the server
    this.http.post(url, body, { headers: headers }).subscribe(data => {
      console.log(data);
    });
  }
  selectBot(bot: string) {
    this.selectedBot = bot;
  }
  selectCode(code: Code) {
    this.selectedCode = code;
    this.selectedCodeName = code.name;
    this.selectedCodeCode = atob(code.code);


  }
  ngOnInit(): void {
    this.getGames();

  }

}

export class Code {
  id: number;
  creator_id: number;
  created_at: string;
  code: string;
  name: string;
}

