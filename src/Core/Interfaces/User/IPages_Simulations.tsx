import { IDesign_Configuration } from './Pages_Simulations/Design_Configuration/IDesign_Configuration';
import IEtape_Capture from './Pages_Simulations/Etape_Capture/IEtape_Capture';
import { IEtapes_View } from "./Pages_Simulations/IEtapes_View";
import { IPage_View } from "./Pages_Simulations/IPage_View";
import { IProspects } from "./Pages_Simulations/IProspects";

// tslint:disable-next-line:class-name
export default interface IPages_Simulations {
  Nom: string;
  Id: number;
  etapes_view: IEtapes_View[];
  page_view: IPage_View[];
  prospects: IProspects[];
  pixel_facebook: string;
  pixel_google: string;
  devise: string;
  design_configuration: IDesign_Configuration;
  etape_capture: IEtape_Capture
}
