import IEtapeDuSimulateur from "src/Core/Interfaces/Others/IEtapeDuSimulateur";

export interface IEtapesDuSimulateur {
  backgroundColorHeader: string;
  currentEtapeOfSimulateur: number;
  setCurrentEtapeOfSimulateur: React.Dispatch<React.SetStateAction<number>>;
  etapesDuSimulateur: IEtapeDuSimulateur[];
  setEtapesDuSimulateur: React.Dispatch<
    React.SetStateAction<IEtapeDuSimulateur[]>
  >;
  onChangeEtape: (currentStep: number) => void;
}
