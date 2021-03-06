import IPages_Simulations from "src/Core/Interfaces/User/ISimulateur";

// tslint:disable-next-line:no-empty-interface
export interface IHeaderSimulateur {
  backgroundColorHeader: string;
  currentEtapeOfSimulateur: number;
  onChangeEtape: (currentStep: number) => void;
  isEtapesStep: boolean;
  simulateurSelected?: IPages_Simulations;
}
