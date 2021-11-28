import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";
import { BackEndRoutesService } from 'src/app/back-end-routes.service';
import { FormControl } from '@angular/forms';
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

          opacity: '0',

        }),
        animate('0.65s ease-out')
      ]),
      // animation code for sliding in forum
    ]),
    trigger('register', [
      transition(':enter', [
        style({
          transform: 'translateY(100%)',

          opacity: '0',

        }),
        animate('0.65s ease-out')
      ]),
      // animation code for sliding in forum
    ])
  ]
})

export class LoginComponent implements OnInit {

  // animation code
  isLeft = 'left';
  user: object = {};
  username = new FormControl('');
  password = new FormControl('');

  constructor(private backendService: BackEndRoutesService) { }
  ngOnInit() { }

  login() {
    this.user = {
      "username": this.username.value,
      "password": this.password.value
    }
    this.backendService.postMethod('cred/login', this.user).subscribe((res) => {
      console.log(res);
    });
  }

}
