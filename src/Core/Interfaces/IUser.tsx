import { IPages_Simulations } from "./User/IPages_Simulations";
export interface IUser {
  Nom: string;
  Prenom: string;
  newUser: boolean;
  pages_simulations: IPages_Simulations[]
}
