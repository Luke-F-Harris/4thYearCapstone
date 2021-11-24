import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GamePageComponent } from './GamePage/game-page/game-page.component';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { LeaderBoardPageComponent } from './LeaderBoardPage/leader-board-page/leader-board-page.component';
import { ProfilePageComponent } from './ProfilePage/profile-page/profile-page.component';

const routes: Routes = [
  {path:"", component: AppComponent},
  {path:"home", component: HomePageComponent},
  {path:"profile", component: ProfilePageComponent},
  {path:"leaderboard", component: LeaderBoardPageComponent},
  {path:"game", component: GamePageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }