
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';


import { BackEndRoutesService } from 'src/app/_services/back-end-routes.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { environment } from 'src/environments/environment';


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
  most_recent:any;
  constructor(private bs:BackEndRoutesService,private http: HttpClient, private token: TokenStorageService) {
  }

  ngOnInit(): void {
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
    this.getMostRecentUploads();
  }
  getMostRecentUploads() {
    this.http.get(environment.wsBaseURL+`/api/codes/date`).subscribe(data =>{this.most_recent = data});

  }
  returnDate(id:any){

    let index = this.most_recent.findIndex((x:any)=> x.creator_id== id)
    if (index == -1) {
      return '';
    } else {
      return this.most_recent[index].created_at;
    }
  }
  getTopPlayerData() {
    return this.bs.getMethod("user/all");
  }
}
