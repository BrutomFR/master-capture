import React, {
  FunctionComponent,
  useEffect,
  // useState,
  // useContext,
} from "react";
import HeaderSimulateur from "src/Core/Components/Dashboard/MesSimulateurs/CreationSimulateurDesign/Header/HeaderSimulateur";
import "./.css";
// import { Context, IContext } from "../Utils/context";
import { IEtapesDuSimulateur } from "./props";

const EtapesDuSimulateur: FunctionComponent<IEtapesDuSimulateur> = (props) => {
  // const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <div>
      <HeaderSimulateur
        currentEtapeOfSimulateur={props.currentEtapeOfSimulateur}
        backgroundColorHeader={props.backgroundColorHeader}
        setCurrentEtapeOfSimulateur={props.setCurrentEtapeOfSimulateur}
        etapesDuSimulateur={props.etapesDuSimulateur}
        setEtapesDuSimulateur={props.setEtapesDuSimulateur}
        onChangeEtape={props.onChangeEtape}
        isEtapesStep={true}
      />
      <div>TEST</div>
    </div>
  );
};

export default EtapesDuSimulateur;
