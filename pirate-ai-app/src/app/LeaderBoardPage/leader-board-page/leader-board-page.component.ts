
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
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
  top_players:any = [];
  displayedColumns: string[] = ['name','rank', 'lastSubmission'];
  dataSource = ELEMENT_DATA;

  constructor(private bs:BackEndRoutesService,private http: HttpClient) {

  }

  ngOnInit(): void {

    //replace code here with db fetching top players


    // get 20 players
    this.sortTopPlayers();

  }

  sortt(dataa:any) {
    return dataa.sort((a:any,b:any)=>(a.score < b.score)? 1:-1);
  }
  sortTopPlayers():void{
    this.getTopPlayerData().subscribe(data => {
      this.top_players = this.sortt(data);
    });
  }

  getTopPlayerData() {
    return this.bs.getMethod("user/all");
  }
}
