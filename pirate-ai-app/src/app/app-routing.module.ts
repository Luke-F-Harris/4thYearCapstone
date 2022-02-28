import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { GamePageComponent } from './GamePage/game-page/game-page.component';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { LeaderBoardPageComponent } from './LeaderBoardPage/leader-board-page/leader-board-page.component';
import { PlaygameComponent } from './playgame/playgame.component';
import { ProfilePageComponent } from './ProfilePage/profile-page/profile-page.component';
import { AuthStopGuard } from './_helpers/auth-stop.guard';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [

  {path:"", redirectTo:'home', pathMatch:"full"},
  {path:"home", component: HomePageComponent},
  {path:"register", component: RegisterComponent, canActivate:[AuthStopGuard]},
  {path:"login", component: LoginComponent, canActivate:[AuthStopGuard]},
  {path:"profile", component: ProfilePageComponent, canActivate:[AuthGuard]},
  {path:"leaderboard", component: LeaderBoardPageComponent},
  {path:"game", component: GamePageComponent},
  {path:"play", component: PlaygameComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
