import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BackEndRoutesService } from 'src/app/_services/back-end-routes.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit {

  uploaded_bot: string;
  wins: any; losses: any; draws: any;
  uploadCodeName: string;
  fileName = '';
  env_url = environment.wsBaseURL
  form: any = {
    code: null,
    name: null
  };
  errorMessage = '';

  profiles_data: any;
  profiles_games: any;
  constructor(private http: HttpClient, private bs: BackEndRoutesService, private router: Router, private token: TokenStorageService) { }

  onFileSelected(event: Event) {
    this.updateErrors();
    const file = (event.target as HTMLInputElement).files[0];
    // const file: File = event.target.files[0];

    if (file) {
      // Get the file data
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Extract the file data and convert to string
        const file_data = reader.result.toString();
        // Devode base64 string to text
        const file_text = atob(file_data.split(',')[1]);
        // Get the file name
        this.fileName = file.name;

        this.uploaded_bot = file_text;
      };
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
  // temp user data


  isProfileMine() {
    let result = false;
    const route = this.router.url;
    var regex: RegExp = /(\d*$)/;
    if (this.token.getUser().id == route.match(regex)[0]) {
      result = true;
    }
    return result;
  }
  onSubmit(): void {

    const { code, name } = this.form;
    const data = {
      name: name,
      code: this.uploaded_bot,
      creator_id: this.profiles_data.id,
    };

    console.log(this.fileName);

    if (this.uploadCodeName == undefined || this.uploaded_bot == "") {
      this.errorMessage = "Missing File Name"
    } else if (this.fileName == "") {
      this.errorMessage = "Missing File"
    }


    this.bs.postMethod("codes/create", data).subscribe({
      next: res => {
        if (res) {
          this.errorMessage = "Successfully Submitted";
        }
      },
    });
  }




  async ngOnInit() {
    // when page loads it loads the user data in, find a cleaner way?
    // this.user_data = this.getUserData("1"); // "1" will be user id
    const route = this.router.url;
    var regex: RegExp = /(\d*$)/;
    await this.getUserData(route.match(regex)[0]);
    await this.getUserGames(route.match(regex)[0]);

  }
  updateErrors(): void {
    this.errorMessage = "";
  }

  getUserGames(id: string): any {
    this.http.get(`${this.env_url}/api/user/${id}/games`).subscribe(res => {

      this.profiles_games = res;
      this.wins = this.profiles_games.filter((x: { outcome: string; }) => x.outcome == 'win').length
      this.losses = this.profiles_games.filter((x: { outcome: string; }) => x.outcome == 'lose').length
      this.draws = this.profiles_games.filter((x: { outcome: string; }) => x.outcome == 'draw').length
    })
  }
  // retrieves user data
  getUserData(id: string): any {
    this.http.get(`${this.env_url}/api/user/${id}`).subscribe(res => {

      this.profiles_data = res;

    })
  }
}
