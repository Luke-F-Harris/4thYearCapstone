import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  pause=false;
  play=true;
  clicked=false;
  constructor() { }

  ngOnInit(): void {
    
  }
  changePause(){
    if(this.clicked){
      this.pause=false;
      this.play=true;
      this.clicked=false;
    }else{
      this.pause=true;
      this.play=false;
      this.clicked=true;
    }
  

    
  }
  

}
