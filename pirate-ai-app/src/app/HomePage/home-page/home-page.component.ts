import { Component, HostListener, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    let user = this.token.getUser();
    this.logged_in_id = user.id;

  }
  ngAfterViewInit (): void {

  }

  logged_in_id :any;
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
