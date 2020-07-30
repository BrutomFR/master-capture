import  IPages_Simulations  from "../../../../Interfaces/User/ISimulateur";

export interface IPopupStatistiqueSimulateur {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  simulateur: IPages_Simulations;
  simulateurIndex: number
}
