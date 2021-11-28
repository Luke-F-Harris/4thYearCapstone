import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

export interface playerInfo {
  name: string;
  rank: number;
  picLink: string;
  lastSubmission: string;
  userId: number;
}


const ELEMENT_DATA: playerInfo[] = [
  {name:"AIrules192",rank:1,picLink:"https://cloudfront-us-east-2.images.arcpublishing.com/reuters/7GBCHQUCEROJDPEVYQW7XG7VAE.jpg",lastSubmission:"1 day ago", userId:1000},
  {name:"xXguidedpirateshipsXx",rank:2,picLink:"https://cloudfront-us-east-2.images.arcpublishing.com/reuters/43YAWLITTZJLZIQTCP2JSS4KSM.jpg",lastSubmission:"1 day ago", userId:12012}
];

@Component({
  selector: 'app-leader-board-page',
  templateUrl: './leader-board-page.component.html',
  styleUrls: ['./leader-board-page.component.scss']
})
export class LeaderBoardPageComponent implements OnInit {



  //array holding top players
  public topPlayers:playerInfo[]=[];
  displayedColumns: string[] = ['name','rank', 'lastSubmission'];
  dataSource = ELEMENT_DATA;

  constructor() {

  }

  ngOnInit(): void {



    //replace code here with db fetching top players


  }

}
