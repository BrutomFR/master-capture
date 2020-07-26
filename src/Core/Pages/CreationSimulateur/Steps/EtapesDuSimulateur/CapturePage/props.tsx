import IEtapeDuSimulateur from "src/Core/Interfaces/Others/IEtapeDuSimulateur";

// tslint:disable-next-line:no-empty-interface
export interface ICapturePage {
  backgroundColorHeader: string;
  currentEtapeOfSimulateur: number;
  setCurrentEtapeOfSimulateur: React.Dispatch<React.SetStateAction<number>>;
  etapesDuSimulateur: IEtapeDuSimulateur[];
  setEtapesDuSimulateur: React.Dispatch<
    React.SetStateAction<IEtapeDuSimulateur[]>
  >;
  onChangeEtape: (currentStep: number) => void;
}
