import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { TokenStorageService } from './_services/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'pirate-ai-app';

  loggedIn:any;
  currentRoute = "";
  constructor(public router: Router, private token: TokenStorageService) {

    router.events.subscribe((event) => {
      this.currentRoute = this.router.url;
    })
  }


  logout() {
    this.token.signOut();
    window.location.reload();
  }

  ngOnInit() {
    this.loggedIn = !!this.token.getToken();
    if (this.loggedIn) {
      const user = this.token.getUser();
    }
  }


}
