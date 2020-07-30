import ISimulateur from "./User/ISimulateur";
export interface IUser {
  Nom: string;
  Prenom: string;
  newUser: boolean;
  simulateurs: ISimulateur[];
}
