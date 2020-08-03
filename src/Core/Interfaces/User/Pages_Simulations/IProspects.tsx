import { ISimulateur } from "./Prospects/ISimulateurs";

export interface IProspects {
  date: number;
  prenom: string;
  email: string;
  simulateurs: ISimulateur[];
  articles: [];
}
