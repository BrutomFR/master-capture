import ISimulateur from "./User/ISimulateur";
import ITutoriel from "./User/ITutoriel";
export interface IUser {
  Nom: string;
  Prenom: string;
  tutoriel: ITutoriel;
  simulateurs: ISimulateur[];
  email: string | null;
}
