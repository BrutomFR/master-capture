import { Layout } from "antd";
import React, {
  FunctionComponent,
  useEffect,
  // useState,
  // useContext,
} from "react";
import "./.css";
import EtapesDuSimulateur from "./EtapesDuSimulateur/EtapesDuSimulateur";
import LeftMenuConfigSimulateurCapture from "./LeftMenuConfigSimulateurCapture/LeftMenuConfigSimulateurCapture";
import LeftMenuConfigSimulateurEtapes from "./LeftMenuConfigSimulateurEtapes/LeftMenuConfigSimulateurEtapes";
import LeftMenuConfigSimulateurTarifs from "./LeftMenuConfigSimulateurTarifs/LeftMenuConfigSimulateurTarifs";
// import { Context, IContext } from "../Utils/context";
import { IStepsContent } from "./props";
const { Content } = Layout;
const StepsContent: FunctionComponent<IStepsContent> = (props) => {
  // const monContext: IContext = useContext(Context);

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <Layout>
      {props.currentStep === 0 ? ( // SI C'EST PAGE DE CAPTURE
        <LeftMenuConfigSimulateurCapture />
      ) : props.currentStep === 1 ? ( // SI C'EST PAGE DES ETAPES DU SIMULATEUR
        <LeftMenuConfigSimulateurEtapes />
      ) : (
        props.currentStep === 2 && <LeftMenuConfigSimulateurTarifs /> // SI C'EST PAGE DES TARIFS
      )}

      <Content>
        {props.currentStep === 0 ? ( // SI C'EST PAGE DE CAPTURE
          <div>
            <div className="steps-content">
              {props.steps[props.currentStep].content}
            </div>
          </div>
        ) : props.currentStep === 1 ? ( // SI C'EST PAGE DES ETAPES DU SIMULATEUR
          <div>
            <EtapesDuSimulateur />
          </div>
        ) : (
          props.currentStep === 2 && ( // SI C'EST PAGE DES TARIFS
            <div className="steps-content">
              {props.steps[props.currentStep].content}
            </div>
          )
        )}
      </Content>
    </Layout>
  );
};

export default StepsContent;
