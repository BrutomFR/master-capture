import { IDesign_Configuration } from "./Pages_Simulations/Design_Configuration/IDesign_Configuration";
import IEtape_Capture from "./Pages_Simulations/Etape_Capture/IEtape_Capture";
import { IEtapes_View } from "./Pages_Simulations/IEtapes_View";
import { IProspects } from "./Pages_Simulations/IProspects";
import { IStatistiquesSimulateur } from "./Pages_Simulations/IStatistiquesSimulateur";

// tslint:disable-next-line:class-name
export default interface ISimulateur {
  Nom: string;
  Id: number;
  etapes_view: IEtapes_View[];
  statistiques_simulateurs: IStatistiquesSimulateur[];
  prospects: IProspects[];
  pixel_facebook: string;
  pixel_google: string;
  devise: string;
  design_configuration: IDesign_Configuration;
  etape_capture: IEtape_Capture;
  active: boolean;
}
