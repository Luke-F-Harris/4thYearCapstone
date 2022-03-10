import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenStorageService } from '../_services/token-storage.service';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  styleUrls: ['./playgame.component.scss']
})
export class PlaygameComponent implements OnInit {
  bots = [
    { "name": "Beginner" },
    { "name": "Intermediate" },
    { "name": "Advanced" },
    { "name": "Expert" },
  ];
  game_map = [
    "",
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert"
  ]


  selectedBot = "Beginner";
  selectedCode: Code;
  selectedCodeName = "";
  confirmation_text = "Delete Code"
  confirmation = false;
  selectedCodeCode: string;

  get_url = "/api/codes/get"; // For testing we just default to being user with id 1? Makes a lot of stuff useless...
  start_game_url = "/api/games/start";
  codes: Code[];
  gameRendered: boolean;
  newLines: string[] = [];
  games: Game[];
  selectedGame: Game;
  game_index = "pending";
  file_selector_string = "";
  index_loc: string;

  constructor(private http: HttpClient, private tokenS: TokenStorageService, private router:Router) {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json');
    headers.append("authorization", this.token);
  }
  user_data = this.tokenS.getUser();
  token = this.tokenS.getToken();

  getCodes() {
    const headers = new HttpHeaders().append("authorization", this.token)
    this.http.get(environment.wsBaseURL + `/api/codes/${this.user_data.id}`, { headers }).subscribe(data => {
      this.codes = data as Code[];
    });

  }
  deleteCode() {
    if (!this.confirmation) {
      this.confirmation_text = "Are You Sure?"
      this.confirmation = true;
    } else {
      // send delete request
      let code_id = this.getCodeId();
      const headers = new HttpHeaders().append("authorization", this.token)

      this.http.post(environment.wsBaseURL + `/api/codes/delete/${this.user_data.id}/${code_id}`, {}, { headers }).subscribe(data => {

      })

      this.selectedCode = undefined
      this.selectedCodeName = null;
      this.getCodes();
      this.reloadPage();
    }
  }

  reloadPage() {
    window.location.reload();
  }
  getCodeId() {
    console.log(this.selectedCode.id)
    return this.selectedCode.id;
  }

  startGame() {
    if (this.selectedCode) {
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
  }
  toTitleCase(str:any) {
    return str.replace(
      /\w\S*/g,
      function(txt:any) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
  selectBot(bot: string) {
    this.selectedBot = bot;
  }
  selectCode(code: Code) {
    this.confirmation = false;
    this.selectedCode = code;
    this.selectedCodeName = code.name;
    this.selectedCodeCode = atob(code.code);
    // Add numbers to each line that are greyed out
    let lines = this.selectedCodeCode.split("\n");
    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
      let numSpace = (8 - (i + 1).toString().length);
      let space = ""
      for (let j = 0; j < numSpace; j++) {
        space += " ";
      }
      newLines.push(i + 1 + space + "|   " + lines[i]);
    }
    this.selectedCodeCode = newLines.join("\n");
  }

  selectGame(game: Game) {
    this.selectedGame = game;
  }
  startRender() {
    this.game_index = "pending";
    this.gameRendered = false;

   this.http.get(environment.wsBaseURL + "/api/games/send").subscribe((data:any) => {
     let url:string = data.url;
     this.gameRendered =true;
      this.index_loc = `http://localhost:3000/static/${url}/index.html`;
   });
  }

  getGame() {
    const headers = new HttpHeaders().append("authorization", this.token)
    this.http.get(environment.wsBaseURL + `/api/games/get/${this.user_data.id}`, { headers }).subscribe(data => {
      this.games = data as Game[];
    });
  }

  ngOnInit(): void {
    this.getCodes();
    this.getGame();
  }
}

export class Code {
  id: number;
  creator_id: number;
  created_at: string;
  code: string;
  name: string;
}
export class Game {
  id: number;
  code_id: number;
  level: number;
  code: string;
  name: string;
  outcome: string;
}


export class Render {
  message: string;
  index: Index;
}
export class Index {
  id: number;
  game_id: number;
  index_location: string;
}
