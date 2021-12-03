import { Component, OnInit } from '@angular/core';
import {GameData} from "../../Interfaces/GameData"



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
  game_data: GameData =
    {game_id:120, game_link:'game/?game_id=120', game_date:"Nov 23rd, 22 - 16:56:17", game_data:{winner:"henry123",loser:"donte129", game_length:120}, game_players: ["henry123", "donte129"]}

  constructor() { }

  getGameData() {
    // retrieves game data based on ?game_id?
  }

  ngOnInit(): void {
  }

  skip_previous() {
    this.sliderEvent(0);
  }

  skip_next() {
   this.sliderEvent(this.game_data.game_data.game_length);
  }
  sliderEvent(event:any) {
    this.slider_value = event.value;
  }
  changePause(){
    this.pause=!this.pause;
    this.play=!this.play;
  }


}
