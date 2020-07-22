import { IReponse } from "./Simulateurs/IReponses";

export interface ISimulateur {
  date: Date;
  plan_selected: string;
  nom: string;
  reponses: IReponse[];
}
