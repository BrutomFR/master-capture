import { IPages_Simulations } from "../../../../Interfaces/User/IPages_Simulations";

export interface ICardSimulateur {
  simulateur: IPages_Simulations;
  openPopup: React.Dispatch<React.SetStateAction<boolean>>;
}
