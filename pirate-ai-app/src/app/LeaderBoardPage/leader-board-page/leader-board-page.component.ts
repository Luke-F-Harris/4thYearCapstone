import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

export interface playerInfo {
  name: string;
  rank: number;
  picLink: string;
  lastSubmission: string;
}


@Component({
  selector: 'app-leader-board-page',
  templateUrl: './leader-board-page.component.html',
  styleUrls: ['./leader-board-page.component.scss']
})
export class LeaderBoardPageComponent implements OnInit {

  

  //array holding top players
  public topPlayers:playerInfo[]=[];
  displayedColumns: string[] = ['name', 'rank', 'picLink', 'lastSubmission'];
  public dataSource: MatTableDataSource<playerInfo>;
  constructor() { 
    
    this.topPlayers.push({name:"bob",rank:1,picLink:"https://i.stack.imgur.com/l60Hf.png",lastSubmission:"1 day ago"});
    this.topPlayers.push({name:"alice",rank:2,picLink:"https://i.stack.imgur.com/l60Hf.png",lastSubmission:"1 day ago"});
    this.dataSource=new MatTableDataSource(this.topPlayers);
  }

  ngOnInit(): void {

    

    //replace code here with db fetching top players

   
  }

}