import React, {
  FunctionComponent,
  useEffect,
  // useContext,
} from "react";
import HeaderSimulateur from "src/Core/Components/Dashboard/MesSimulateurs/CreationSimulateurDesign/Header/HeaderSimulateur";
import "./.css";
// import { Context, IContext } from "../Utils/context";
import { ICapturePage } from "./props";
const CapturePage: FunctionComponent<ICapturePage> = (props) => {
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
        isEtapesStep={false}
      />
      <div>Nouveau composant</div>
    </div>
  );
};

export default CapturePage;
