import { IReponse } from "./Simulateurs/IReponses";

export interface ISimulateur {
  date: number;
  id: number;
  nom: string;
  reponses: IReponse[];
}
