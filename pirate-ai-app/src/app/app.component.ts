import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'pirate-ai-app';

  currentRoute = "";
  constructor(public router: Router) {
    router.events.subscribe((event) => {
      this.currentRoute = this.router.url;
    })
  }

  ngOnInit() {

  }

  // implement logging in feature
  loggedIn = false;
  // implement register feature and guard and such
}
