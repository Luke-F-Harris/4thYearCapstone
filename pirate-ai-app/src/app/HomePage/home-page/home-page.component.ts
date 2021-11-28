import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit (): void {

  }


  // using this for main page text appear effect
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
  let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  let min =0;
   if(pos != min )   {
    (document.querySelector('.front-page-text') as HTMLElement).classList.add("show");
   }
  }

}
