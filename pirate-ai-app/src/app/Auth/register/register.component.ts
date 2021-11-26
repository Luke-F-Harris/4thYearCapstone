import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { BackEndRoutesService } from 'src/app/back-end-routes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {

  user:object = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirm: ''
  }

  response: any = "";
  constructor(private backendservice: BackEndRoutesService) { }

  ngOnInit(): void {
  }
  registerUser(user_details : object) {
    this.backendservice.postMethod('register', user_details).subscribe((res:any) => {
      this.response = res;
    })
  }
}
