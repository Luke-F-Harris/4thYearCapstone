import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'pirate-ai-app';

  currentRoute = "";
  constructor(public router: Router, private authService:AuthenticationService) {
    router.events.subscribe((event) => {
      this.currentRoute = this.router.url;
    })
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }
  loggedIn = this.authService.currentUserValue;
}
