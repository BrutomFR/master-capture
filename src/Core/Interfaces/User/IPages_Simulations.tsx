import { IEtapes_View } from "./Pages_Simulations/IEtapes_View";
import { IPage_View } from "./Pages_Simulations/IPage_View";
import { IProspects } from "./Pages_Simulations/IProspects";

// tslint:disable-next-line:class-name
export interface IPages_Simulations {
  Nom: string;
  Date_Creation: number;
  etapes_view: IEtapes_View[];
  page_view: IPage_View[];
  prospects: IProspects[];
  pixel_facebook: string;
  pixel_google: string;
  devise: string;
}
