import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pirate-ai-app';

  // implement logging in feature
  loggedIn = false;

  // implement register feature and guard and such
}
