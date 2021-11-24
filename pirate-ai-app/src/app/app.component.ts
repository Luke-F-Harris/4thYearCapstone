import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pirate-ai-app';

  constructor(public router: Router) {

  }


  // implement logging in feature
  loggedIn = false;

  // implement register feature and guard and such
}
