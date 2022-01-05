import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from "@angular/animations";
import { BackEndRoutesService } from 'src/app/back-end-routes.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';



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

  loginForm: FormGroup;
  returnUrl: string;
  html_response:any;

  constructor(
    private backendService: BackEndRoutesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {

    // if user logged in already bring them to profile
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

    // get return url from route parameters or default to '/'
    if (this.route.snapshot.queryParams['returnUrl'] == "/login"){
      this.returnUrl= "/profile";
    } else {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.html_response = this.authenticationService.login(this.f['username'].value, this.f['password'].value);
    console.log(this.html_response)
  }
}
