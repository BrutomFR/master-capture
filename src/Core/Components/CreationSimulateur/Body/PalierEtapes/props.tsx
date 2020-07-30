import IEtapeDuSimulateur from "src/Core/Interfaces/Others/IEtapeDuSimulateur";
import IPages_Simulations from 'src/Core/Interfaces/User/ISimulateur';

export interface IPalierEtapes {
  backgroundColorHeader: string;
  currentEtapeOfSimulateur: number;
  setCurrentEtapeOfSimulateur: React.Dispatch<React.SetStateAction<number>>;
  etapesDuSimulateur: IEtapeDuSimulateur[];
  setEtapesDuSimulateur: React.Dispatch<
    React.SetStateAction<IEtapeDuSimulateur[]>
  >;
  onChangeEtape: (currentStep: number) => void;
  etapeSelected: number;
  setEtapeSelected: React.Dispatch<React.SetStateAction<number>>;
  simulateurSelected?: IPages_Simulations;
}
