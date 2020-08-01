import ISimulateur from "src/Core/Interfaces/User/ISimulateur";

export interface IMenuConfigPalierEtapes {
  simulateurSelected: ISimulateur;
  currentEtapeOfSimulateur: number;
}
