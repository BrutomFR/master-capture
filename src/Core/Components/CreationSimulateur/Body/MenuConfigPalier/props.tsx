import IPages_Simulations from 'src/Core/Interfaces/User/ISimulateur';
import { IEtapes_View } from "src/Core/Interfaces/User/Pages_Simulations/IEtapes_View";

export interface IMenuConfigPalier {
  setBackgroundColorHeader: React.Dispatch<React.SetStateAction<string>>;
  setBackgroundTarifsHeaderColor: React.Dispatch<React.SetStateAction<string>>;
  backgroundTarifsHeaderColor: string;
  backgroundColorHeader: string;
  setBackgroundTarifsPlanColor: React.Dispatch<React.SetStateAction<string>>;
  backgroundTarifsPlanColor: string;
  etapeConfigSelected?: IEtapes_View;
  palierSelected: number;
  simulateurSelected: IPages_Simulations;
  currentEtapeOfSimulateur: number
  onChangeEtape: (etape: number) => void;
}
