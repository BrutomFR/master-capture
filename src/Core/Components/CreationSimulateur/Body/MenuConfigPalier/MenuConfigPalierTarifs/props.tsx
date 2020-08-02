import ISimulateur from "src/Core/Interfaces/User/ISimulateur";

export interface IMenuConfigPalierTarifs {
  simulateurSelected: ISimulateur;
  currentEtapeOfSimulateur: number;
  setBackgroundTarifsColor: React.Dispatch<React.SetStateAction<string>>;
  backgroundTarifsColor: string;
  setBackgroundTarifsPlanColor: React.Dispatch<React.SetStateAction<string>>;
  backgroundTarifsPlanColor: string;
}
