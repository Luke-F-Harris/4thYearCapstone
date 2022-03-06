import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenStorageService } from '../_services/token-storage.service';
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
  confirmation_text = "Delete Code"
  confirmation = false;
  selectedCodeCode: string;

  get_url = "/api/codes/get"; // For testing we just default to being user with id 1? Makes a lot of stuff useless...
  start_game_url = "/api/games/start";
  codes: Code[];
  gameRendered: boolean;
  newLines: string[] = [];
  constructor(private http: HttpClient, private tokenS: TokenStorageService) {
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

      this.http.post(environment.wsBaseURL + `/api/codes/delete/${this.user_data.id}/${code_id}`,{}, { headers }).subscribe(data =>{
        console.log(data);
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
    if (this.selectedCode){
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
  ngOnInit(): void {
    this.getCodes();
  }
}

export class Code {
  id: number;
  creator_id: number;
  created_at: string;
  code: string;
  name: string;
}

