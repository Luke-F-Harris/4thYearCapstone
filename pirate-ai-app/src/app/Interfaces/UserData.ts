import {GameData} from './GameData';
export interface UserData {
  username: string;
  prefered_language: string;
  id:string,
  rank: number;
  uploads:number;
  games: GameData[];
  image_url:string;
  games_played:number;
  highest_rank_achieved:number;
}
