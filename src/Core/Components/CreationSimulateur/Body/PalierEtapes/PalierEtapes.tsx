import React, {
  FunctionComponent,
  useEffect,
  // useState,
  // useContext,
} from "react";
import HeaderSimulateur from "../SimulateurLive/Header/HeaderSimulateur";
import "./.css";
// import { Context, IContext } from "../Utils/context";
import { IPalierEtapes } from "./props";

const PalierEtapes: FunctionComponent<IPalierEtapes> = (props) => {
  // const monContext: IContext = useContext(Context);

  useEffect(() => {
    // console.log(props.etapesDuSimulateur[props.currentEtapeOfSimulateur].title);
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
        isEtapesStep={true}
        simulateurSelected={props.simulateurSelected}
      />
      <div>
        {
          props.simulateurSelected?.etapes_view[props.currentEtapeOfSimulateur]
            .question
        }
      </div>
    </div>
  );
};

export default PalierEtapes;
