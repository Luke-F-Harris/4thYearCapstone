import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { GamePageComponent } from './GamePage/game-page/game-page.component';
import { ProfilePageComponent } from './ProfilePage/profile-page/profile-page.component';
import { LeaderBoardPageComponent } from './LeaderBoardPage/leader-board-page/leader-board-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider"
import {MatToolbarModule} from "@angular/material/toolbar"
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GamePageComponent,
    ProfilePageComponent,
    LeaderBoardPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
