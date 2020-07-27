import React, { FunctionComponent, useEffect } from "react";
// import { Context, IContext } from "src/Utils/context";
import HeaderSimulateur from "../SimulateurLive/Header/HeaderSimulateur";
import "./.css";
import { IPalierCapture } from "./props";
const PalierCapture: FunctionComponent<IPalierCapture> = (props) => {
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
        onChangeEtape={props.onChangeEtape}
        isEtapesStep={false}
        simulateurSelected={props.simulateurSelected}
      />
      <div>
        <h1>{props.simulateurSelected?.etape_capture.titre}</h1>
      </div>
    </div>
  );
};

export default PalierCapture;
