import { Component, OnInit } from '@angular/core';
import { BackEndRoutesService } from 'src/app/_services/back-end-routes.service';


export interface playerInfo {
  name: string;
  rank: number;
  picLink: string;
  lastSubmission: string;
  userId: number;
}

// change playerInfo to UserData


const ELEMENT_DATA: playerInfo[] = []

@Component({
  selector: 'app-leader-board-page',
  templateUrl: './leader-board-page.component.html',
  styleUrls: ['./leader-board-page.component.scss']
})
export class LeaderBoardPageComponent implements OnInit {



  //array holding top players
  public top_players:playerInfo[]=[];
  displayedColumns: string[] = ['name','rank', 'lastSubmission'];
  dataSource = ELEMENT_DATA;

  constructor(private bs:BackEndRoutesService) {

  }

  ngOnInit(): void {

    //replace code here with db fetching top players


    // get 20 players
    this.top_players = this.getTopPlayerData();
    console.log(this.top_players)
  }

  getTopPlayerData() {

    let player_data: any[] = []

    this.bs.getMethod("user/all").subscribe((req:any) => {
      player_data = req;
      console.log(req)
    })
    console.log(player_data)
    return player_data.sort((a,b) => (a.score < b.score) ? 1:-1);

  }

}
