import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

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
  form: any = {
    fist_name:null,
    last_name:null,
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { first_name, last_name, username, email, password } = this.form;

    this.authService.register(first_name, last_name, username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
