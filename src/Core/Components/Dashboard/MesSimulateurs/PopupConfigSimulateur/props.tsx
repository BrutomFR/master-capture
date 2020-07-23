import { IPages_Simulations } from "../../../../Interfaces/User/IPages_Simulations";

export interface IPopupConfigSimulateur {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  simulateur: IPages_Simulations;
}
