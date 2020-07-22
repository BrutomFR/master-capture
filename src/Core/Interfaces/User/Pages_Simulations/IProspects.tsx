import { IReponse } from "./Etapes_View/IReponse";
import { ISimulateur } from "./Prospects/ISimulateurs";

export interface IProspects {
  date: Date;
  email: string;
  simulateurs: ISimulateur[];
  articles: [];
}
