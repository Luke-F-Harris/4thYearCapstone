import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition} from "@angular/animations";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [

    // animation code for sliding in forum
    trigger('leftCenter', [
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',

          opacity:'0',

        }),
        animate('0.65s ease-out')
      ]),
      // animation code for sliding in forum
    ]),
    trigger('register', [
      transition(':enter', [
        style({
          transform: 'translateY(100%)',

          opacity:'0',

        }),
        animate('0.65s ease-out')
      ]),
      // animation code for sliding in forum
    ])
  ]
})

export class LoginComponent implements OnInit {

  // animation code
  isLeft='left';

  constructor() { }

  ngOnInit(): void {
this.isLeft='center';

  }

}
