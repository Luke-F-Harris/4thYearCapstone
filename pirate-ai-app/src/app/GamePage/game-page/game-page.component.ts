import { Component, OnInit } from '@angular/core';

export interface gameInfo {
  game_id: number,
  game_link: string,
  game_date:string,
  game_data:{winner:string, loser:string, /* other data */},
  game_players: string[] //this should be playerInfo[] instead of string[], find a way to import this class from leaderboard.ts (same with game_data.winner shit)
}



@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})

export class GamePageComponent implements OnInit {
  pause = false;
  play = true;

  game_data: gameInfo =
    {game_id:120, game_link:'game/?game_id=120', game_date:"Nov 23rd, 22 - 16:56:17", game_data:{winner:"henry123",loser:"donte129"}, game_players: ["henry123", "donte129"]}

  constructor() { }

  getGameData() {
    // retrieves game data based on ?game_id?
  }

  ngOnInit(): void {


  }

  changePause(){
    this.pause=!this.pause;
    this.play=!this.play;
  }


}
