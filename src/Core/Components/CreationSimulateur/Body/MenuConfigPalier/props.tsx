import IPages_Simulations from 'src/Core/Interfaces/User/ISimulateur';
import { IEtapes_View } from "src/Core/Interfaces/User/Pages_Simulations/IEtapes_View";

export interface IMenuConfigPalier {
  setBackgroundColorHeader: React.Dispatch<React.SetStateAction<string>>;
  backgroundColorHeader: string;
  etapeConfigSelected?: IEtapes_View;
  palierSelected: number;
  simulateurSelected: IPages_Simulations;
}
