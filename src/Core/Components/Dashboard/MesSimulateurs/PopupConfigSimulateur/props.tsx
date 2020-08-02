import  IPages_Simulations from "../../../../Interfaces/User/ISimulateur";

export interface IPopupConfigSimulateur {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  simulateur: IPages_Simulations;
  selectedSimulateur: number
}
