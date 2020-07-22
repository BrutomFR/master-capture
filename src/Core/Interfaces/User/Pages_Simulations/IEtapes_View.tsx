import { IInformation } from "./Etapes_View/IInformation";
import { IReponse } from "./Etapes_View/IReponse";

export interface IEtapes_View {
  information: IInformation;
  question: string;
  titre_progressbar: string;
  reponses: IReponse[];
}
