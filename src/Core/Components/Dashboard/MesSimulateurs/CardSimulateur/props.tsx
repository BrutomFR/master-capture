import IPages_Simulations from "../../../../Interfaces/User/IPages_Simulations";

export interface ICardSimulateur {
  simulateur: IPages_Simulations;
  openPopupConfig: React.Dispatch<React.SetStateAction<boolean>>;
  openPopupStatistiques: React.Dispatch<React.SetStateAction<boolean>>;
}
