import { UserData } from "./UserData";
export interface GameData {
  game_id: number,
  game_link: string,
  game_date:string,
  game_data:{winner:string, loser:string, game_length:number, /* other data */},
  game_players: string[] //this should be playerInfo[] instead of string[], find a way to import this class from leaderboard.ts (same with game_data.winner shit)
}
